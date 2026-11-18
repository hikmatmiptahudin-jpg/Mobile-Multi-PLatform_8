
import { Link, type Href } from 'expo-router';
import React, { type ComponentProps } from 'react';
import { openBrowserAsync } from 'expo-web-browser';

type ExternalLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string;
};

export function ExternalLink(props: ExternalLinkProps) {
  return (
    <Link
      {...props}
      href={props.href as Href}
      onPress={(event) => {
        if (props.href.startsWith('/')) {
          return;
        }

        event.preventDefault();
        openBrowserAsync(props.href);
      }}
    />
  );
}
