import React from 'react';
import Translate from '@docusaurus/Translate';
import styles from './index.module.css';

export type RequestStateProps = {
  loading?: boolean;
  failed?: boolean;
  empty?: boolean;
  onRetry?: () => void;
};

/**
 * 统一的请求状态提示：加载中、请求失败（含重试）、成功但无数据。
 * 请求正常返回数据时渲染 null，由调用方继续展示原有内容。
 */
export default function RequestState({
  loading, failed, empty, onRetry
}: RequestStateProps): React.JSX.Element | null {
  if (loading) {
    return (
      <div className={styles.container} role="status" aria-live="polite">
        <Translate id="mirror.request.loading">正在加载...</Translate>
      </div>
    );
  }

  if (failed) {
    return (
      <div className={styles.container} role="alert">
        <p className={styles.message}>
          <Translate id="mirror.request.failed">加载失败，请稍后重试。</Translate>
        </p>
        {onRetry &&
          <button
            className="button button--primary"
            type="button"
            onClick={onRetry}
          >
            <Translate id="mirror.request.retry">重试</Translate>
          </button>
        }
      </div>
    );
  }

  if (empty) {
    return (
      <div className={styles.container} role="status">
        <Translate id="mirror.request.empty">暂无数据。</Translate>
      </div>
    );
  }

  return null;
}
