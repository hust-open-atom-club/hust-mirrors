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
    const displayPolicy = yamlData.display_policy;
    
    // 处理display_policy
    if (displayPolicy && displayPolicy.kind === 'OneOf') {
      // 生成OneOf类型的变量选择框
      const variables = displayPolicy.variables || [];
      
      // 构建varcode代码块
      const varcodeLines = [];
      const jsLines = [];
      
      // 生成变量选择框
      variables.forEach(variable => {
        const varName = variable.name;
        const description = variable.description || varName;
        const options = variable.options || [];
        
        const optionStr = options.map(opt => `${opt.name}:${opt.name}`).join(', ');
        varcodeLines.push(`[ ] (${varName}) { ${optionStr} } ${description}`);
      });
      
      if (yamlData.privileged) {
        varcodeLines.push("[ ] (root) 是否为 root 用户");
      }
      
      varcodeLines.push("---");
      
      if (yamlData.privileged) {
        jsLines.push("const SUDO = !root ? 'sudo ' : '';");
        jsLines.push("");
      }
      
      // 为每个变量和选项组合生成命令变量
      const commandVars = [];
      variables.forEach(variable => {
        const varName = variable.name;
        const options = variable.options || [];
        
        options.forEach(option => {
          const optionName = option.name;
          const displayIndices = option.display || [];
          
          displayIndices.forEach(index => {
            if (index > 0 && index <= files.length) {
              const fileInfo = files[index - 1]; // 转换为0基索引
              const path = fileInfo.path || '';
              const matchPattern = fileInfo.match || '';
              const replaceText = fileInfo.replace || '';
              const statement = fileInfo.statement || '';
              const flags = fileInfo.flags || '';
              
              let sedCmd;
              if (statement) {
                sedCmd = `sed -i.bak ${flags} "${statement}" ${path}`;
              } else {
                sedCmd = `sed -i.bak -E -e "s|${matchPattern}|${replaceText}|g" ${path}`;
              }
              
              const cmdVarName = `CMD_${varName}_${optionName}_${index}`.replace(/[^a-zA-Z0-9_]/g, '_');
              if (yamlData.privileged) {
                jsLines.push(`const ${cmdVarName} = ${varName} === '${optionName}' ? SUDO + \`${sedCmd}\` : '';`);
              } else {
                jsLines.push(`const ${cmdVarName} = ${varName} === '${optionName}' ? \`${sedCmd}\` : '';`);
              }
              commandVars.push(cmdVarName);
            }
          });
        });
      });
      
      jsLines.push("---");
      
      // 将所有命令变量合并到同一行
      if (commandVars.length) {
        jsLines.push(
          commandVars
            .map(cmdVar => `\${${cmdVar}}`)
            .join('')
        );
      }
      
      lines.push("```shell varcode");
      lines.push(...varcodeLines);
      lines.push(...jsLines);
      lines.push("```");
    } else {
      // 默认行为：All或无display_policy时展示所有文件
      files.forEach((fileInfo, i) => {
        const path = fileInfo.path || '';
        const matchPattern = fileInfo.match || '';
        const replaceText = fileInfo.replace || '';
        const statement = fileInfo.statement || '';
        const flags = fileInfo.flags || '';
        const comment = fileInfo.comment || '';
        
        lines.push(`**替换文件${i + 1}**：${path}\n`);
        if (comment) {
          lines.push(`${ comment }`);
        }
        lines.push("示例命令：\n");
        // 使用 sed 替换正则

        let sedCmd;
        if (statement) {
          sedCmd = `sed -i.bak ${flags} "${statement}" ${path}`;
        } else {
          sedCmd = `sed -i.bak -E -e "s|${matchPattern}|${replaceText}|g" ${path}`;
        }

        if (yamlData.privileged) {
          lines.push("```shell varcode");
          lines.push("[ ] (root) 是否为 root 用户");
          lines.push("---");
          lines.push("const SUDO = !root ? 'sudo ' : '';");
          lines.push("---");
          lines.push(`\${SUDO}${sedCmd}`);
          lines.push("```");
        } else {
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
    }
  } else if (actionType === 'TestAndExecute' || actionType === 'Execute') {
    lines.push(`**操作方法：${yamlData.description || '执行命令'}**\n`);
    // 处理test部分
    if (yamlData.test) {
      const testContent = extractDocsContent(yamlData.test.trim());
      if (testContent) {
        lines.push("测试条件：\n");
        
        if (yamlData.privileged) {
          lines.push("```shell varcode");
          lines.push("[ ] (root) 是否为 root 用户");
          lines.push("---");
          lines.push("const SUDO = !root ? 'sudo ' : '';");
          lines.push("---");
          const testLines = testContent.split('\n');
          let inHereDoc = false;
          let hereDocDelimiter = '';
          
          testLines.forEach(line => {
            // 检查是否是here-document的开始
            const hereDocMatch = line.match(/<<\s*([A-Za-z_][A-Za-z0-9_]*|'[^']*'|"[^"]*")/);
            if (hereDocMatch && !inHereDoc) {
              inHereDoc = true;
              hereDocDelimiter = hereDocMatch[1].replace(/['"]/g, ''); // 移除引号
              lines.push(`\${SUDO}${line}`);
            } else if (inHereDoc && line.trim() === hereDocDelimiter) {
              // here-document的结束
              inHereDoc = false;
              hereDocDelimiter = '';
              lines.push(line);
            } else if (inHereDoc) {
              // here-document的内容，不添加SUDO
              lines.push(line);
            } else {
              // 普通命令行，添加SUDO
              lines.push(`\${SUDO}${line}`);
            }
          });
        } else {
          lines.push('```bash varcode');
          lines.push(testContent);
        }
        lines.push('```');
        lines.push("**请确定测试条件满足后再执行命令。**\n");
      }
    }
    
    // 处理exec部分
    if (yamlData.exec) {
      const execContent = extractDocsContent(yamlData.exec.trim());
      if (execContent) {
        lines.push("执行命令：\n");
        if (yamlData.privileged) {
          lines.push("```shell varcode");
          lines.push("[ ] (root) 是否为 root 用户");
          lines.push("---");
          lines.push("const SUDO = !root ? 'sudo ' : '';");
          lines.push("---");
          const execLines = execContent.split('\n');
          let inHereDoc = false;
          let hereDocDelimiter = '';
          
          execLines.forEach(line => {
            // 检查是否是here-document的开始
            const hereDocMatch = line.match(/<<\s*([A-Za-z_][A-Za-z0-9_]*|'[^']*'|"[^"]*")/);
            if (hereDocMatch && !inHereDoc) {
              inHereDoc = true;
              hereDocDelimiter = hereDocMatch[1].replace(/['"]/g, ''); // 移除引号
              lines.push(`\${SUDO}${line}`);
            } else if (inHereDoc && line.trim() === hereDocDelimiter) {
              // here-document的结束
              inHereDoc = false;
              hereDocDelimiter = '';
              lines.push(line);
            } else if (inHereDoc) {
              // here-document的内容，不添加SUDO
              lines.push(line);
            } else {
              // 普通命令行，添加SUDO
              lines.push(`\${SUDO}${line}`);
            }
          });
        } else {
          lines.push('```bash varcode');
          lines.push(execContent);
        }
        lines.push('```');
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
