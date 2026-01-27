import { useState, useEffect } from "react";
import { Terminal } from "lucide-react";
import styles from "./TerminalDemo.module.css";

interface TerminalDemoProps {
  showDescription?: boolean;
}

export const TerminalDemo: React.FC<TerminalDemoProps> = ({ showDescription = false }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const steps = [
    {
      title: "Developer View",
      command: "hapi serve petstore --headless",
      description: "Test instantly with any MCP Client",
      output: [
        "🚀 HAPI CLI v2.1.0",
        "📄 Loading petstore...",
        "✅ Found 8 endpoints",
        "🔧 Generating test suite...",
        "✨ HAPI MCP server running on :3000"
      ]
    },
    {
      title: "AI Integration",
      command: "hapi serve my-api --mcp",
      description: "Wrap API as MCP server for AI agents",
      output: [
        "🚀 HAPI CLI v2.1.0",
        "📄 Loading my-api endpoints...",
        "🤖 Creating MCP server...",
        "🔗 Exposing 12 tools to AI agents",
        "✨ MCP server running on :3000"
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(true);
      setTimeout(() => {
        setCurrentStep((prev) => (prev + 1) % steps.length);
        setIsTyping(false);
      }, 1000);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentStepData = steps[currentStep];

  return (
    <div className={styles.container}>
      <div className={styles.textCenter}>
        <h2 className={styles.title}>See HAPI CLI in Action</h2>
        <p className={styles.subtitle}>Watch how one command transforms your API workflow</p>
      </div>

      <div className={styles.grid}>
        {/* Terminal Window */}
        <div className={styles.terminalWrapper}>
          <div className={styles.terminalCard}>
            {/* Terminal Header */}
            <div className={styles.terminalHeader}>
              <div className={styles.dots}>
                <div className={`${styles.dot} ${styles.dotRed}`}></div>
                <div className={`${styles.dot} ${styles.dotYellow}`}></div>
                <div className={`${styles.dot} ${styles.dotGreen}`}></div>
              </div>
              <div className={styles.headerTitle}>
                <span>Terminal</span>
              </div>
            </div>

            {/* Terminal Content */}
            <div className={styles.terminalBody}>
              <div className={styles.commandLine}>
                {/* <Terminal className={styles.icon} /> */}
                <span>$</span>
                <span>
                  {currentStepData.command}
                </span>
                {isTyping && <span className={styles.cursor}>|</span>}
              </div>
              
              {!isTyping && (
                <div className={styles.output}>
                  {currentStepData.output.map((line, index) => (
                    <div
                      key={index}
                      className={styles.outputLine}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        {!showDescription && (
        <div className={styles.descriptionWrapper}>
          <div className={styles.descContainer}>
            <div>
              <h3 className={styles.currentStepTitle}>
                {currentStepData.title}
              </h3>
              <p className={styles.currentStepDesc}>
                {currentStepData.description}
              </p>
            </div>

            <div className={styles.features}>
              <div className={styles.featureItem}>
                <div className={styles.featureDot}></div>
                <span className={styles.featureText}>Simple one-command setup</span>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.featureDot} style={{ animationDelay: '0.5s' }}></div>
                <span className={styles.featureText}>Works with any OpenAPI/Swagger spec</span>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.featureDot} style={{ animationDelay: '1s' }}></div>
                <span className={styles.featureText}>Instant AI integration ready</span>
              </div>
            </div>

            {/* Step indicators */}
            <div className={styles.stepIndicators}>
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`${styles.stepDot} ${
                    index === currentStep ? styles.stepDotActive : ''
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};