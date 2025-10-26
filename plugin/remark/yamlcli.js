const { visitParents, SKIP } = require("unist-util-visit-parents");
const yaml = require('js-yaml');
const { fromMarkdown } = require('mdast-util-from-markdown');

const generateNode = (txt) => {
  return fromMarkdown(txt, {
    extensions: [require('micromark-extension-mdxjs').mdxjs()],
    mdastExtensions: [require('mdast-util-mdx').mdxFromMarkdown()]
  }).children[0]
}

/**
 * 提取USE_IN_DOCS标签之间的内容
 * @param {string} content 
 * @returns {string}
 */
const extractDocsContent = (content) => {
  // 检查是否包含USE_IN_DOCS标签
  if (content.includes('#{USE_IN_DOCS/}') && content.includes('#{/USE_IN_DOCS}')) {
    // 使用正则表达式提取标签之间的内容
    const pattern = /#{USE_IN_DOCS\/}(.*?)#{\/USE_IN_DOCS}/gs;
    const matches = [...content.matchAll(pattern)];
    
    if (matches.length > 0) {
      // 合并所有匹配的内容，去除前后空白
      const docsContent = matches
        .map(match => match[1].trim())
        .filter(content => content)
        .join('\n');
      return docsContent;
    } else {
      // 有标签但没有内容
      return '';
    }
  } else {
    // 没有标签，返回原始内容
    return '';
  }
};

/**
 * 将YAML数据格式化为人类可读的markdown
 * @param {Object} yamlData 
 * @returns {string}
 */
const formatYamlAsMarkdown = (yamlData) => {
  const lines = [];
  
  // 根据type决定操作描述
  const actionType = yamlData.type || '';
  
  if (actionType === 'ReplaceIfExist') {
    lines.push("**操作方法：替换文件中的内容**\n");
    
    const files = yamlData.files || [];
    files.forEach((fileInfo, i) => {
      const path = fileInfo.path || '';
      const matchPattern = fileInfo.match || '';
      const replaceText = fileInfo.replace || '';
      const comment = fileInfo.comment || '';
      
      lines.push(`**替换文件${i + 1}**：${path}\n`);
      if (comment) {
        lines.push(`${ comment }\n`);
      }
      lines.push("示例命令：");
      // 使用 sed 替换正则

      const sedCmd = `sed -i.bak "s/${matchPattern}/${replaceText}/g" ${path}`;
      if (yamlData.privileged) {
        lines.push("```shell varcode");
        lines.push("[ ] (root) 是否为 root 用户");
        lines.push("---");
        lines.push("const SUDO = !root ? 'sudo ' : '';");
        lines.push("---");
        lines.push(`\${SUDO}${sedCmd}\n\`\`\``);
      }
      else {
        if (sedCmd.includes('${_domain}') || sedCmd.includes('${_http}')) {
          lines.push(`\`\`\`bash varcode\n${sedCmd}\n\`\`\``);
        } else {
          lines.push(`\`\`\`bash\n${sedCmd}\n\`\`\``);
        }
      }
      
      
      if (i < files.length - 1) {
        lines.push("");
      }
    });
  } else if (actionType === 'TestAndExecute') {
    lines.push(`**操作方法：${yamlData.description || '执行命令'}**\n`);

    // 处理test部分
    if (yamlData.test) {
      const testContent = extractDocsContent(yamlData.test.trim());
      if (testContent) {
        lines.push("测试条件：");
        lines.push(`\`\`\`bash varcode\n${testContent}\n\`\`\``);
        lines.push("**请确定测试条件满足后再执行命令。**\n");
      }
    }
    
    // 处理exec部分
    if (yamlData.exec) {
      const execContent = extractDocsContent(yamlData.exec.trim());
      if (execContent) {
        lines.push("执行命令：");
        lines.push(`\`\`\`bash varcode\n${execContent}\n\`\`\``);
      }
    }
  }
  
  return lines.join('\n');
};

/** @type {import("unified").Plugin} */
const plugin = (_) => {
  return (ast) => {
    const yamlBlocks = [];
    
    visitParents(ast,
      (node) => node.type === "code" && 
                node.lang === 'yaml' && 
                (node.meta === 'cli' || node.meta === 'cli-nodocs'),
      (node, ancestors) => {
        const yamlContent = node.value;
        
        try {
          const yamlData = yaml.load(yamlContent);
          if (yamlData) {
            yamlBlocks.push(yamlData);
            
            // 如果是cli-nodocs，直接移除节点
            if (node.meta === 'cli-nodocs') {
              const parent = ancestors[ancestors.length - 1];
              const nodeIndex = parent.children.indexOf(node);
              parent.children.splice(nodeIndex, 1);
              return SKIP;
            }
            
            // 如果是cli，替换为人类可读的markdown
            if (node.meta === 'cli') {
              const markdownContent = formatYamlAsMarkdown(yamlData);
              if (markdownContent) {
                const markdownAst = fromMarkdown(markdownContent);
                const parent = ancestors[ancestors.length - 1];
                const nodeIndex = parent.children.indexOf(node);
                parent.children.splice(nodeIndex, 1, ...markdownAst.children);
              } else {
                // 如果没有生成内容，移除节点
                const parent = ancestors[ancestors.length - 1];
                const nodeIndex = parent.children.indexOf(node);
                parent.children.splice(nodeIndex, 1);
              }
              return SKIP;
            }
          }
        } catch (error) {
          console.warn(`解析YAML块时出错: ${error.message}`);
        }
        
        return;
      }
    );
    
  }
}

module.exports = plugin;
