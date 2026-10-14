import { useSharedContext } from '@site/src/utils/SharedContext';
import React from "react";

type VariableProps = {
  http: string;
  isHttps: boolean;
  domain: string;
}

type IFC = React.FunctionComponent<VariableProps>;
type IFCE = React.FunctionComponentElement<VariableProps>;

type Props = {
  component?: IFC | IFC[];
  children?: IFCE | IFCE[];
};

export default function WithVariables(props: Props) {
  const ctx = useSharedContext();
  const isHttps = ctx.https;
  const http = isHttps ? 'https' : 'http';
  const domain = ctx.domain;

  const retNodes = [];

  if (props.component) {
    if (Array.isArray(props.component)) {
      retNodes.push(
        ...props.component.map((c, key) => React.createElement(c, { http, isHttps, domain, key }))
      );
    } else {
      retNodes.push(React.createElement(props.component, { http, isHttps, domain }));
    }
  }

  if (props.children) {
    retNodes.push(...React.Children.map(props.children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          http, isHttps, domain
        });
      }
      return child;
    }));
  }

  return <>{retNodes}</>;
}

export function SiteLink(props: React.AnchorHTMLAttributes<typeof SiteLink>) {

  const L = (props: VariableProps | any) => {
    const href = `${props.http}://${props.domain}${props.href}`;
    return <a {...props} href={href} />
  }

  return <WithVariables>
    <L {...props} />
  </WithVariables>

}
