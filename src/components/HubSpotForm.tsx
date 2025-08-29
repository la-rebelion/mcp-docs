import React, { JSX } from 'react';

export default function HubSpotForm({ divider = true, oneLine = false }: { divider?: boolean; oneLine?: boolean }): JSX.Element {
    React.useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://js.hsforms.net/forms/v2.js';
        document.body.appendChild(script);

        script.addEventListener('load', () => {
            // @ts-ignore
            if (window.hbspt) {
                // @ts-ignore
                window.hbspt.forms.create({
                    portalId: "21339207",
                    formId: "de581f51-e2af-41b3-8987-224d4132daa7",
                    region: "na1",
                    target: '#hubspotForm'
                })
            }
        });
    }, []);
    return (
        <>
            {divider && (
                <hr style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #eee' }} />
            )}
            <div
                style={{
                    display: 'flex',
                    gap: '4px',
                    margin: '8px 0',
                    // alignSelf: 'stretch',
                    flexBasis: '80%',
                    flexDirection: 'column',
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div
                        id="hubspotForm"
                        style={{ margin: 'auto' }}
                    ></div>
                    <small style={{ color: '#666', fontSize: '12px', textAlign: 'center' }}>
                        By continuing you agree to our{' '}
                        <a href="/privacy" style={{ color: '#888', textDecoration: 'underline' }}>
                            <b>Privacy Policy</b>
                        </a>
                    </small>
                </div>
            </div>
        </>
    );
}