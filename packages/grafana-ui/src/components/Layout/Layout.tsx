import React from 'react';
import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';
import { stylesFactory, useTheme } from '../../themes';

enum Orientation {
  Horizontal,
  Vertical,
}
type Spacing = 'xs' | 'sm' | 'md' | 'lg';
type Justify = 'flex-start' | 'flex-end' | 'space-between' | 'center';
type Align = 'normal' | 'flex-start' | 'flex-end' | 'center';

export interface LayoutProps {
  children: React.ReactNode[];
  orientation?: Orientation;
  spacing?: Spacing;
  justify?: Justify;
  align?: Align;
}

export interface ContainerProps {
  padding?: Spacing;
  margin?: Spacing;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  orientation = Orientation.Horizontal,
  spacing = 'sm',
  justify = 'flex-start',
  align = 'normal',
}) => {
  const theme = useTheme();
  const styles = getStyles(theme, orientation, spacing, justify, align);
  return (
    <div className={styles.layout}>
      {React.Children.map(children, (child, index) => {
        return <div className={styles.buttonWrapper}>{child}</div>;
      })}
    </div>
  );
};

export const HorizontalGroup: React.FC<Omit<LayoutProps, 'orientation'>> = ({ children, spacing, justify }) => (
  <Layout spacing={spacing} justify={justify} orientation={Orientation.Horizontal}>
    {children}
  </Layout>
);
export const VerticalGroup: React.FC<Omit<LayoutProps, 'orientation'>> = ({ children, spacing, justify }) => (
  <Layout spacing={spacing} justify={justify} orientation={Orientation.Vertical}>
    {children}
  </Layout>
);

export const Container: React.FC<ContainerProps> = ({ children, padding, margin }) => {
  const theme = useTheme();
  const styles = getContainerStyles(theme, padding, margin);
  return <div className={styles.wrapper}>{children}</div>;
};

const getStyles = stylesFactory(
  (theme: GrafanaTheme, orientation: Orientation, spacing: Spacing, justify: Justify, align) => {
    return {
      layout: css`
        display: flex;
        flex-direction: ${orientation === Orientation.Vertical ? 'column' : 'row'};
        justify-content: ${justify};
        align-items: ${align};
        height: 100%;
      `,
      buttonWrapper: css`
        margin-bottom: ${orientation === Orientation.Horizontal ? 0 : theme.spacing[spacing]};
        margin-right: ${orientation === Orientation.Horizontal ? theme.spacing[spacing] : 0};

        &:last-child {
          margin-bottom: 0;
          margin-right: 0;
        }
      `,
    };
  }
);

const getContainerStyles = stylesFactory((theme: GrafanaTheme, padding?: Spacing, margin?: Spacing) => {
  const paddingSize = (padding && theme.spacing[padding]) || 0;
  const marginSize = (margin && theme.spacing[margin]) || 0;
  return {
    wrapper: css`
      margin: ${marginSize};
      padding: ${paddingSize};
    `,
  };
});
