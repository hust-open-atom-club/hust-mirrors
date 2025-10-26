"""
Markdown YAML CLI 处理器
读取带有特殊标记的markdown文件，提取yaml cli代码块，生成配置文件和文档
"""

import re
import yaml
import sys
from pathlib import Path
from typing import Dict, Tuple


class MarkdownYAMLProcessor:
    def __init__(self):
        self.yaml_blocks = []
        self.markdown_content = []
        
    def process_file(self, input_file: str) -> Tuple[str, str]:
        """
        处理输入的markdown文件
        返回: (yaml配置内容, 人类可读markdown内容)
        """
        with open(input_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 解析内容
        self._parse_content(content)
        
        # 生成YAML配置
        yaml_config = self._generate_yaml_config()
        
        # 生成人类可读的markdown
        parsed_markdown = self._generate_parsed_markdown(content)
        
        return yaml_config, parsed_markdown
    
    def _parse_content(self, content: str):
        """解析markdown内容，提取yaml cli块"""
        # 正则表达式匹配yaml cli代码块
        pattern = r'```yaml\s+cli(?:\s+#[^\n]*)?\n(.*?)```'
        matches = re.finditer(pattern, content, re.DOTALL)
        
        for match in matches:
            yaml_content = match.group(1)
            try:
                yaml_data = yaml.safe_load(yaml_content)
                if yaml_data:
                    self.yaml_blocks.append(yaml_data)
            except yaml.YAMLError as e:
                print(f"解析YAML块时出错: {e}", file=sys.stderr)
        
        # 同样处理cli-nodocs块
        pattern_nodocs = r'```yaml\s+cli-nodocs(?:\s+#[^\n]*)?\n(.*?)```'
        matches_nodocs = re.finditer(pattern_nodocs, content, re.DOTALL)
        
        for match in matches_nodocs:
            yaml_content = match.group(1)
            try:
                yaml_data = yaml.safe_load(yaml_content)
                if yaml_data:
                    self.yaml_blocks.append(yaml_data)
            except yaml.YAMLError as e:
                print(f"警告: 解析YAML块时出错: {e}", file=sys.stderr)
    
    def _generate_yaml_config(self) -> str:
        """生成YAML配置文件内容"""
        config = {
            'kind': 'Automation',
            'actions': self.yaml_blocks
        }
        
        return yaml.dump(config, default_flow_style=False, allow_unicode=True, sort_keys=False)
    
    def _generate_parsed_markdown(self, original_content: str) -> str:
        """生成人类可读的markdown文档"""
        # 替换yaml cli块为人类可读的描述
        result = original_content
        
        # 处理yaml cli块（需要生成文档的）
        pattern = r'```yaml\s+cli(?:\s+#[^\n]*)?\n(.*?)```'
        
        def replace_yaml_block(match):
            yaml_content = match.group(1)
            try:
                yaml_data = yaml.safe_load(yaml_content)
                return self._format_yaml_as_markdown(yaml_data)
            except:
                return match.group(0)  # 如果解析失败，保持原样
        
        result = re.sub(pattern, replace_yaml_block, result, flags=re.DOTALL)
        
        # 移除cli-nodocs块
        pattern_nodocs = r'```yaml\s+cli-nodocs(?:\s+#[^\n]*)?\n.*?```\n?'
        result = re.sub(pattern_nodocs, '', result, flags=re.DOTALL)
        
        return result.strip()
    
    def _format_yaml_as_markdown(self, yaml_data: Dict) -> str:
        """将YAML数据格式化为人类可读的markdown"""
        lines = []
        
        # 根据type决定操作描述
        action_type = yaml_data.get('type', '')
        
        if action_type == 'ReplaceIfExist':
            lines.append("操作方法：替换文件中的内容")
            
            files = yaml_data.get('files', [])
            for i, file_info in enumerate(files, 1):
                path = file_info.get('path', '')
                match_pattern = file_info.get('match', '')
                replace_text = file_info.get('replace', '')
                
                lines.append(f"替换文件{i}：{path}")
                # 使用 sed 替换正则
                sed_cmd = f"sed -i \"s/{match_pattern}/{replace_text}/g\" {path}"
                lines.append("示例命令：")
                lines.append(f"```bash\n{sed_cmd}\n```")
                
                if i < len(files):
                    lines.append("")
        
        elif action_type == 'TestAndExecute':
            lines.append(f"操作方法：{yaml_data.get('description', '执行测试和脚本')}")
            
            # 处理test部分
            if 'test' in yaml_data:
                test_content = yaml_data['test'].strip()
                # 提取USE_IN_DOCS标签内的内容
                test_content = self._extract_docs_content(test_content)
                if test_content:
                    lines.append("测试条件：")
                    lines.append(f"```\n{test_content}\n```")
            
            # 处理exec部分
            if 'exec' in yaml_data:
                exec_content = yaml_data['exec'].strip()
                # 提取USE_IN_DOCS标签内的内容
                exec_content = self._extract_docs_content(exec_content)
                if exec_content:
                    lines.append("执行命令：")
                    lines.append(f"```\n{exec_content}\n```")
        
        return '\n'.join(lines)
    
    def _extract_docs_content(self, content: str) -> str:
        """
        提取#{USE_IN_DOCS/}和#{/USE_IN_DOCS}标签之间的内容
        如果没有标签，返回原始内容
        如果有标签但没有内容在标签内，返回空字符串
        """
        # 检查是否包含USE_IN_DOCS标签
        if '#{USE_IN_DOCS/}' in content and '#{/USE_IN_DOCS}' in content:
            # 使用正则表达式提取标签之间的内容
            pattern = r'#{USE_IN_DOCS/}(.*?)#{/USE_IN_DOCS}'
            matches = re.findall(pattern, content, re.DOTALL)
            
            if matches:
                # 合并所有匹配的内容，去除前后空白
                docs_content = '\n'.join(match.strip() for match in matches if match.strip())
                return docs_content
            else:
                # 有标签但没有内容
                return ''
        else:
            # 没有标签，返回原始内容
            return content



def main():
    """主函数"""
    if len(sys.argv) < 2:
        print("用法: python script.py <input_markdown_file> [output_yaml_file] [output_markdown_file]")
        sys.exit(1)
    
    input_file = sys.argv[1]

    input_path = Path(input_file)
    output_yaml = sys.argv[2] if len(sys.argv) > 2 else input_path.stem + '_config.yaml'
    output_markdown = sys.argv[3] if len(sys.argv) > 3 else input_path.stem + '_parsed.md'
    
    # 检查输入文件是否存在
    if not Path(input_file).exists():
        print(f"错误: 输入文件 '{input_file}' 不存在")
        sys.exit(1)
    
    # 处理文件
    processor = MarkdownYAMLProcessor()
    try:
        yaml_content, markdown_content = processor.process_file(input_file)
        
        # 写入输出文件
        with open(output_yaml, 'w', encoding='utf-8') as f:
            f.write(yaml_content)
        print(f"已生成YAML配置文件: {output_yaml}")
        
        with open(output_markdown, 'w', encoding='utf-8') as f:
            f.write(markdown_content)
        print(f"已生成可读Markdown文件: {output_markdown}")
        
    except Exception as e:
        print(f"错误: 处理文件时出错: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
