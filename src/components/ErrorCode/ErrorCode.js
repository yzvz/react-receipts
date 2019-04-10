import React from 'react';
import styles from './ErrorCode.module.css';

const ErrorCode = (props) => {
  const errorUrl = props.error.config.url
    ? <strong>{props.error.config.url}: </strong> : null;
  const errorMessage = props.error.message || 'Unknown error';

  return (
    <code className={styles.code}>
      {errorUrl}
      {errorMessage}
    </code>
  );
};

export default ErrorCode;
