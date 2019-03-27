import React, { useCallback } from 'react';
import { Button } from 'antd';
import { IBaseTheme, IBaseComponentProps } from 'ide-lib-base-component';

import { StyledContainer } from './styles';
import { TComponentCurrying, initSuits } from './component';
import { configLibEngine, ESubApps, CONTROLLED_KEYS } from './config';
import { LibEngineModel } from './model';

export interface ISubComponents {}

export interface ILibEngineEvent {
  /**
   * 点击回调函数
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

// export interface ILibEngineStyles extends IBaseStyles {
//   container?: React.CSSProperties;
// }

export interface ILibEngineTheme extends IBaseTheme {
  main: string;
}

export interface ILibEngineProps extends ILibEngineEvent, IBaseComponentProps {
  /**
   * 是否展现
   */
  visible?: boolean;

  /**
   * 文案
   */
  text?: string;
}

export const DEFAULT_PROPS: ILibEngineProps = {
  visible: true,
  theme: {
    main: '#25ab68'
  },
  styles: {
    container: {}
  }
};

export const LibEngineCurrying: TComponentCurrying<
  ILibEngineProps,
  ISubComponents
> = subComponents => props => {
  const { visible, text, styles, onClick } = props;

  const onClickButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick && onClick(e);
    },
    [onClick]
  );

  return (
    <StyledContainer
      style={styles.container}
      visible={visible}
      // ref={this.root}
      className="ide-lib-engine-container"
    >
      <Button onClick={onClickButton}>{text || '点我试试'}</Button>
    </StyledContainer>
  );
};

const {
  NormalComponent: LibEngine,
  ComponentHOC: LibEngineHOC,
  ComponentAddStore: LibEngineAddStore,
  ComponentFactory: LibEngineFactory
} = initSuits({
  ComponentCurrying: LibEngineCurrying,
  className: configLibEngine.basic.className,
  solution: configLibEngine.component.solution,
  defaultProps: DEFAULT_PROPS,
  subComponents: ESubApps,
  controlledKeys: CONTROLLED_KEYS,
  ComponentModel: LibEngineModel,
  subAppCreators: {},
  idPrefix: configLibEngine.store.idPrefix
});

export {
  LibEngine,
  LibEngineHOC,
  LibEngineAddStore,
  LibEngineFactory
}
