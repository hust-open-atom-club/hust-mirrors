---
title: 命令行工具
slug: /
sidebar_position: 1
---
import TOCInline from '@theme/TOCInline';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Admonition from '@theme/Admonition';
import TerminalIcon from '@site/static/icons/terminal.svg';
import { useLocation } from '@docusaurus/router';
import CliAnimation from '@site/src/components/CliAnimation';


export const CliCodeBlock = ({children}) => {
    const option = []
    return <Tabs groupId="mode" queryString>
        {/*<TabItem value="bash" label="在线使用(Bash)">
            <CodeBlockWithVariables
                code={({_http,_domain})=>`sh <(curl ${_http}://${_domain}/get) ${children}`}
                options={option}
                blockProps={{ language: 'bash' }} />
        </TabItem>*/}
        <TabItem value="online" label="在线使用">
            <CodeBlockWithVariables
                code={({_http,_domain})=>`curl -sSfL ${_http}://${_domain}/get | sh -s -- ${children}`}
                options={option}
                blockProps={{ language: 'bash' }} />
        </TabItem>
        <TabItem value="offline" label="已安装">
            <CodeBlockWithVariables
                code={({_http,_domain})=>`hustmirror-cli ${children}`}
                options={option}
                blockProps={{ language: 'bash' }} />
        </TabItem>
    </Tabs>;
}

export const SoftwareGuide = () => {
    const {search} = useLocation();
    const d = new URLSearchParams(search).get('d')
    if(!d) return <></>
    return <Admonition type="tip" icon="💡" title={
    <>
        <span>{d}使用向导</span>
    </>}>
        <Tabs>
            <TabItem value="deploy" label="部署">
                <p>如果没有<a href="#安装工具--更新工具">安装工具</a>，请执行：</p>
                <CodeBlockWithVariables
                    code={({_http,_domain})=>`curl -sSfL ${_http}://${_domain}/get | sh -s -- deploy ${d}`}
                    options={[]}
                    blockProps={{ language: 'bash' }} />
                <p>如果已经<a href="#安装工具--更新工具">安装工具</a>，请执行：</p>
                <CodeBlockWithVariables
                    code={({_http,_domain})=>`hustmirror-cli deploy ${d}`}
                    options={[]}
                    blockProps={{ language: 'bash' }} />
            </TabItem>
            <TabItem value="recover" label="恢复">
                <p>在恢复前，请<a href="#安装工具--更新工具">确保已安装工具</a></p>
                <CodeBlockWithVariables
                    code={({_http,_domain})=>`hustmirror-cli recover ${d}`}
                    options={[]}
                    blockProps={{ language: 'bash' }} />
            </TabItem>
        </Tabs>
    </Admonition>
}

命令行工具 [hustmirror-cli](https://github.com/hust-open-atom-club/hustmirror-cli.git) 是一个可以帮助你快速换源的小工具。

<SoftwareGuide/>

其具有以下功能：

- 一键替换软件源
- 恢复替换的软件源
- 在线更新

其支持的软件/系统在主页列表中使用<TerminalIcon height='1em' width='1em' style={{verticalAlign: 'middle', margin: '0 4px'}}/>
进行标注。

可以从下面的超链接列表中选择你的需求，以快速开始

<TOCInline toc={toc} />

:::info 关于POSIX Shell
该命令行工具是采用POSIX shell兼容语法编写的。
其声明的解释器为`PATH`中的`sh`，在dash和bash解释器中测试通过。不要使用fish，pwsh等不兼容POSIX Shell脚本解释器运行。
:::

## 自动部署

工具检测当前是否存在可被部署的系统/软件源，如发现可部署，进行自动部署。

可以加上`-y`选项，跳过选择使用默认设置。

<CliCodeBlock>autodeploy #或者采用ad</CliCodeBlock>
<CliAnimation.UbuntuAutoDeploySample/>

## 交互模式运行

<CliCodeBlock>-i</CliCodeBlock>
<CliAnimation.UbuntuInteractiveSample/>

## 恢复原配置文件

<CliCodeBlock>recover</CliCodeBlock>
<CliAnimation.UbuntuAutoRecoverSample/>

## 安装工具 / 更新工具

通过命令安装工具后，你可以使用`hustmirror-cli`命令随时替换/恢复镜像源。  
该命令还可以对已安装的工具进行手动在线更新。

<CliCodeBlock>install</CliCodeBlock>
<CliAnimation.InstallSample/>

## 获取详细帮助

除了上述命令以外，命令行工具还支持制定软件进行deploy/recover，不同软件还有各自的参数和环境变量设置。

查看工具的基础帮助，可以

<CliCodeBlock>help #查看基础帮助</CliCodeBlock>

对子命令或者一些源，例如deploy命令，可以

<CliCodeBlock>help deploy #查看具体主题的帮助</CliCodeBlock>

<CliAnimation.HelpSample/>
