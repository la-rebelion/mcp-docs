import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// @note Interface for API metadata structure from openapi.json
interface ApiMetadata {
  file_size: number;
  file_hash: string;
  last_modified: number;
  format: 'yaml' | 'json';
}

// @note Interface for individual API specification
interface ApiSpec {
  filename: string;
  title: string;
  description: string;
  version: string;
  endpoints: number;
  metadata: ApiMetadata;
}

// @note Interface for the complete openapi.json structure
interface ApiData {
  summary: {
    total_apis: number;
    total_endpoints: number;
    generated_at: string;
    script_version: string;
  };
  apis: ApiSpec[];
}

// @note Component props interface
interface APICardsProps {
  baseUrl?: string;
  runMcpUrl?: string;
}

// @note Dialog component for viewing API content
const ApiViewDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  api: ApiSpec | null;
  content: string;
}> = ({ isOpen, onClose, api, content }) => {
  if (!isOpen || !api) return null;

  return (
    <div className={styles.dialogOverlay} onClick={onClose}>
      <div className={styles.dialogContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.dialogHeader}>
          <h3>{api.title}</h3>
          <button onClick={onClose} className={styles.closeButton}>
            ×
          </button>
        </div>
        <div className={styles.dialogBody}>
          <pre className={styles.codeBlock}>
            <code>{content}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

const APICards: React.FC<APICardsProps> = ({ 
  runMcpUrl = 'http://localhost:8080'
}) => {
  const [apiData, setApiData] = useState<ApiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    api: ApiSpec | null;
    content: string;
  }>({
    isOpen: false,
    api: null,
    content: ''
  });
  const effectiveBaseUrl = `${useDocusaurusContext().siteConfig.url}/apis/openapi` || '/apis/openapi';

  // @note Fetch API data from openapi.json
  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const response = await fetch('/apis/openapi.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch API data: ${response.statusText}`);
        }
        const data: ApiData = await response.json();
        setApiData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load API data');
      } finally {
        setLoading(false);
      }
    };

    fetchApiData();
  }, []);

  // @note Copy URL to clipboard functionality
  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // @todo Add toast notification for successful copy
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  }, []);

  // @note Format file size for display
  const formatFileSize = useCallback((bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  }, []);

  // @note Format last modified date
  const formatLastModified = useCallback((timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }, []);

  // @note Handle view action - fetch and display API content
  const handleView = useCallback(async (api: ApiSpec) => {
    try {
      const response = await fetch(`/apis/openapi/${api.filename}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${api.filename}`);
      }
      const content = await response.text();
      setDialogState({
        isOpen: true,
        api,
        content
      });
    } catch (err) {
      console.error('Failed to load API content:', err);
      // @todo Add error toast notification
    }
  }, []);

  // @note Handle download action
  const handleDownload = useCallback(async (api: ApiSpec) => {
    try {
      const response = await fetch(`/apis/openapi/${api.filename}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${api.filename}`);
      }
      const content = await response.text();
      const blob = new Blob([content], { 
        type: api.metadata.format === 'json' ? 'application/json' : 'text/yaml' 
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = api.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to download API file:', err);
      // @todo Add error toast notification
    }
  }, []);

  // @note Handle deploy action
  const handleDeploy = useCallback((apiUrl: string) => {
    const deployUrl = `${runMcpUrl}?api=${encodeURIComponent(apiUrl)}`;
    window.open(deployUrl, '_blank');
  }, [runMcpUrl]);

  if (loading) {
    return <div className={styles.loading}>Loading API specifications...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (!apiData || apiData.apis.length === 0) {
    return <div className={styles.empty}>No API specifications found.</div>;
  }

  return (
    <>
      <div className={styles.apiCardsContainer}>
        <div className={styles.summary}>
          <h3>API Overview</h3>
          <p>
            Total APIs: <strong>{apiData.summary.total_apis}</strong> | 
            Total Endpoints: <strong>{apiData.summary.total_endpoints}</strong> | 
            Last Updated: <strong>{new Date(apiData.summary.generated_at).toLocaleDateString()}</strong>
          </p>
        </div>

        <div className={styles.cardsGrid}>
          {apiData.apis.map((api) => {
            const apiUrl = `${effectiveBaseUrl}/${api.filename}`;

            return (
              <div key={api.filename} className={styles.apiCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>
                    <img 
                      src="/img/chatmcp/chatmcp-white.svg" 
                      alt="ChatMCP Logo"
                      style={{ width: '40px', height: '40px' }}
                    />
                  </div>
                  <div className={styles.cardTitle}>
                    <h4>{api.title}</h4>
                    <span className={clsx(styles.status, styles.version)}>
                      {api.version}
                    </span>
                    <span className={clsx(styles.status, styles.apiFormat)}>
                      {api.metadata.format.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className={styles.cardDescription}>
                  <p>{api.description.length > 100 ? `${api.description.slice(0, 100)}...` : api.description}</p>
                </div>

                <div className={styles.cardUrl}>
                  <span className={styles.urlText}>{apiUrl}</span>
                  <button 
                    onClick={() => copyToClipboard(apiUrl)}
                    className={styles.copyButton}
                    title="Copy URL"
                  >
                    📋
                  </button>
                </div>

                <div className={styles.cardMetadata}>
                  <div className={styles.metadataItem}>
                    <span>Endpoints: {api.endpoints}</span>
                  </div>
                  <div className={styles.metadataItem}>
                    <span>Size: {formatFileSize(api.metadata.file_size)}</span>
                  </div>
                  <div className={styles.metadataItem}>
                    <span>Modified: {formatLastModified(api.metadata.last_modified)}</span>
                  </div>
                  <div className={styles.metadataItem}>
                    <span title={api.metadata.file_hash}>
                      Hash: {api.metadata.file_hash.substring(0, 8)}...
                    </span>
                  </div>
                </div>

                <div className={styles.cardActions}>
                  <button 
                    onClick={() => handleDeploy(apiUrl)}
                    className={clsx(styles.actionButton, styles.deployButton)}
                  >
                    Deploy
                  </button>
                  <button 
                    onClick={() => handleView(api)}
                    className={clsx(styles.actionButton, styles.viewButton)}
                  >
                    View
                  </button>
                  <button 
                    onClick={() => handleDownload(api)}
                    className={clsx(styles.actionButton, styles.downloadButton)}
                  >
                    Download
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ApiViewDialog
        isOpen={dialogState.isOpen}
        onClose={() => setDialogState({ isOpen: false, api: null, content: '' })}
        api={dialogState.api}
        content={dialogState.content}
      />
    </>
  );
};

export default APICards;
