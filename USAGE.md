# 文档编写说明

镜像站的文档中嵌入了自定义的 `yaml cli` 和 `yaml cli-nodocs` 代码块，用于将镜像站文档和 `hustmirrors-cli` 工具之间的替换方式相统一

## 标签信息

在每个文档的开头处，应当设置有 frontmatter 元数据，其中描述该镜像的检测方法、名称等

```yaml
sidebar_label: PyPI # 侧边栏标题
title: Python 软件包索引仓库使用帮助 # 页面标题
detection: # 自动部署时，用于检测是否执行该镜像替换的方法，若无此部分则生成的脚本无法自动部署
  policy: OneOf # 满足任意（OneOf） / 全部满足（AllOf）
  checks:
    - type: command # 检测是否存在命令
      command: pip
    - type: os_release # 检查os_release文件中 NAME 变量
      name: Kali Linux
```

## 文档中代码块

标签为 `yaml cli` 的代码可以自动显示在帮助页面文档中，并生成 cli 处理步骤；标签为 `yaml cli-nodocs` 的代码块仅会生成 cli 处理步骤，不显示在文档页面中

文档中代码块可以使用以下变量

1. `${_http}` http 协议
2. `${_domain}` 站点域名
3. `${_backup_dir}`（仅限 cli 生成工具）备份文件存储路径

### 正则表达式替换文件中内容

使用规则为 `ReplaceIfExist` 的代码块替换文件中的内容。使用这种方式进行的替换可以自动生成恢复函数。

对于指定了 `match` 和 `replace` 的代码块，最终生成在文档和 cli 中的语句为：`sed -i -E -e "s|match|replace|g" /path/to/file`

若需要自定义替换表达式或标志，请使用 `statement` 和 `flags` 标签

```yaml
type: ReplaceIfExist # 固定写法
required: true # 是否为关键步骤，若关键步骤失败则脚本直接返回
optional: false # 是否可选，若可选则会提升用户是否执行
description: 替换Kali主仓库
privileged: true # 是否使用sudo执行
files:
  - path: /etc/apt/sources.list # 需要替换内容的文件
    match: 'https?://([^/]+)/kali' # 查找的正则表达式
    replace: '${_http}://${_domain}/kali' # 替换的内容
    comment: 替换 # 显示在文档页面中的提示
  - path: /path/to/file
  	statement: '1i\\Server = ${_http}://${_domain}/archlinux/$repo/os/$arch' # sed命令使用的
    flags: '-e -E' # 执行sed时传递的参数

display_policy: # 生成文档页面时，多个替换文件的显示逻辑
  kind: OneOf # 增加变量并只显示一种（OneOf）或全部显示（AllOf）
  variables:
    - name: version # 变量名称
      description: Ubuntu 版本 # 显示的变量名
      options: # 选项
        - name: '>= 24.04'
          display: 
            - 1 # 选择此项时，展示的文件
        - name: '<= 23.10'
          display:
            - 2
```

### 执行命令

注意：
1. 此部分中无法自动生成恢复脚本，需要自行指定 `recover` 代码，若无则代表无恢复方法
2. 此部分的代码默认不生成至帮助页面中，若生成，请将**需要显示的部分**包裹在 `#{USE_IN_DOCS/}` 和 `#{/USE_IN_DOCS}` 标签中

```yaml
type: Execute
description: Update Ubuntu APT sources
optional: true
privileged: true
exec: |
  apt-get update
```

### 测试并执行命令

注意：
1. 此部分中无法自动生成恢复脚本，需要自行指定 `recover` 代码，若无则代表无恢复方法
2. 此部分的代码默认不生成至帮助页面中，若生成，请将**需要显示的部分**包裹在 `#{USE_IN_DOCS/}` 和 `#{/USE_IN_DOCS}` 标签中

```yaml
type: TestAndExecute
required: false
privileged: false
test: | # 测试命令，若不通过（返回非0）则不会执行exec部分
  has_command pip 
exec: | # 执行替换的命令
  pip config get global.index-url 2>/dev/null > ${_backup_dir}/pip.bak
  #{USE_IN_DOCS/}
  pip config set global.index-url "https://${_domain}/pypi/web/simple/"
  #{/USE_IN_DOCS}
recover: | # 恢复命令，不会显示在帮助页面
  last_url=$(cat "${_backup_dir}/pip.bak")
  pip config set global.index-url "$last_url"
```

提示：代码块执行命令的部分支持插入 `here-document`。但在插入时，请使用 `tee` 而非文件重定向以保证权限，如：

```sh
tee -a /etc/uv/uv.toml > /dev/null << EOF 
[[index]]
url = "https://${_domain}"
default = true
EOF
```