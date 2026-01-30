---
sidebar_label: CPAN
title: Perl Language Package Repository Usage Guide
type: repo
---

:::info

Some content in this document may have been translated by AI.

:::

[CPAN](https://www.cpan.org/) (The Comprehensive Perl Archive Network) mirror source configuration file is `MyConfig.pm` (usually located at `~/.cpan/CPAN/MyConfig.pm`), which can be modified using the package management script `cpan`.

## First Use

For Perl 5.36 (or CPAN 2.29) and above, use the following command to automatically generate MyConfig.pm

```bash varcode
PERL_MM_USE_DEFAULT=1 perl -MCPAN -e 'CPAN::HandleConfig->edit("pushy_https", 0); CPAN::HandleConfig->edit("urllist", "unshift", "${_http}://${_domain}/CPAN/"); mkmyconfig'
```

For older versions, use the following command to automatically generate

```bash varcode
PERL_MM_USE_DEFAULT=1 perl -MCPAN -e 'CPAN::HandleConfig->edit("urllist", "unshift", "${_http}://${_domain}/CPAN/"); mkmyconfig'
```

Or manually confirm each configuration option without using default configuration

```bash varcode
perl -MCPAN -e 'mkmyconfig'
```

## Existing Configuration

### Manually Set Mirror in CPAN Shell

Execute `cpan` in the command line to enter the cpan shell:

```shell varcode
cpan shell -- CPAN exploration and modules installation
Enter 'h' for help.

# List current mirror settings
cpan[1]> o conf urllist

# Add this site mirror to the top of the mirror list
# Note: If already in the list, you can skip this step and exit directly. The modification will not perform automatic deduplication
cpan[2]> o conf urllist unshift ${_http}://${_domain}/CPAN/

# Or add this site mirror to the end of the mirror list
# Note: Execute one of this command and the above command. The modification will not perform automatic deduplication
cpan[3]> o conf urllist push ${_http}://${_domain}/CPAN/

# Or clear the mirror list, keeping only this site
cpan[4]> o conf urllist ${_http}://${_domain}/CPAN/

# Perl 5.36 and above users need to disable pushy_https to use mirror sites
cpan[5]> o conf pushy_https 0

# Save the modified configuration to MyConfig.pm
cpan[6]> o conf commit

# Exit cpan shell
cpan[7]> quit
```

### Use Script to Set in Command Line

Execute in command line:

```bash varcode
# If this site is not in the mirror list, add it to the top of the list
if ! (
    perl -MCPAN -e 'CPAN::HandleConfig->load();' \\
        -e 'CPAN::HandleConfig->prettyprint("urllist")' |
    grep -qF '${_http}://${_domain}/CPAN/'
); then
    perl -MCPAN -e 'CPAN::HandleConfig->load();' \\
        -e 'CPAN::HandleConfig->edit("urllist", "unshift", "${_http}://${_domain}/CPAN/");' \\
        -e 'CPAN::HandleConfig->commit()'
fi

# Perl 5.36 and above users also need to disable pushy_https
perl -MCPAN -e 'CPAN::HandleConfig->load();' \\
    -e 'CPAN::HandleConfig->edit("pushy_https", 0);' \\
    -e 'CPAN::HandleConfig->commit()'
```

## References

1. [Tuna Mirror Usage Guide](https://mirrors.tuna.tsinghua.edu.cn/help/CPAN/)
