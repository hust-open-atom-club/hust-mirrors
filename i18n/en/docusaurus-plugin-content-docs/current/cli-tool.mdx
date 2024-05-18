---
title: CLI Tool
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
        <TabItem value="online" label="Online">
            <CodeBlockWithVariables
                code={({_http,_domain})=>`curl -sSfL ${_http}://${_domain}/get | sh -s -- ${children}`}
                options={option}
                blockProps={{ language: 'bash' }} />
        </TabItem>
        <TabItem value="offline" label="Installed">
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
        <span>CLI Tool: Instuction of {d},</span>
        <a href="#installing--updating">install tool first</a>
    </>}>
        <Tabs>
            <TabItem value="deploy" label="Deploy">
                <CodeBlockWithVariables
                    code={({_http,_domain})=>`hustmirror-cli deploy ${d}`}
                    options={[]}
                    blockProps={{ language: 'bash' }} />
            </TabItem>
            <TabItem value="recover" label="Recover">
                <CodeBlockWithVariables
                    code={({_http,_domain})=>`hustmirror-cli recover ${d}`}
                    options={[]}
                    blockProps={{ language: 'bash' }} />
            </TabItem>
        </Tabs>
    </Admonition>
}

The command-line tool [hustmirror-cli](https://gitee.com/dzm91_hust/hustmirror-cli.git)  is a small utility that helps you quickly switch software sources.<SoftwareGuide/>

It has the following features:
- One-click replacement of software sources
- Restoration of replaced software sources
- Online updates

The supported software/systems are indicated using <TerminalIcon height='1em' width='1em' style={{ verticalAlign: 'middle', margin: '0 4px' }} /> in the main page list.

You can select your requirements from the hyperlinks below to get started quickly.

<TOCInline toc={toc} />

:::info About Bash and POSIX Shell
This command-line tool is written in POSIX shell-compatible syntax.
The declared interpreter is `sh` from the `PATH`, and it has been tested in both the dash and bash interpreters.

Bash and POSIX Shell mentioned in this document are shell environments for running and downloading online.

When using it online, since the POSIX Shell method uses pipes that occupy stdin and cannot receive user input, it is recommended to use the Bash method.
:::
## Automatic Deployment

The tool detects whether there are deployable systems/software sources. If deployable sources are found, it proceeds with automatic deployment.

Add `-y` option to skip confirmation, using default settings.

<CliCodeBlock>autodeploy # or use 'ad'</CliCodeBlock>
<CliAnimation.UbuntuAutoDeploySample windowStyle={{ height: 400 }} />

## Running in Interactive Mode

<CliCodeBlock>-i</CliCodeBlock>
<CliAnimation.UbuntuInteractiveSample windowStyle={{ height: 400 }} />

## Restore origin configurations

<CliCodeBlock>recover</CliCodeBlock>
<CliAnimation.UbuntuAutoRecoverSample/>


## Installing / Updating

After installing the tool via a command, you can use the 'hustmirror-cli' command to replace/restore mirror sources at any time.
This command can also be used for manual online updates of the installed tool.

<CliCodeBlock>install</CliCodeBlock>
<CliAnimation.InstallSample windowStyle={{ height: 400 }} />

## Getting Detailed Help

Besides above, this cli tool support other features
such as deploy/recover specific softwares.

To view the basic help for the tool, you can use:

<CliCodeBlock>help # View basic help</CliCodeBlock>

For subcommands or specific topics like the `deploy` command, you can use:

<CliCodeBlock>help deploy # View help for a specific topic</CliCodeBlock>

<CliAnimation.HelpSample/>
