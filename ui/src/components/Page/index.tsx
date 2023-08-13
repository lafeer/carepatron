import React from 'react';

export default function Page({ children }: { children?: React.ReactNode }) {
	return (
		<div style={{ margin: 'auto', padding: '24px', height: 'calc(100vh - 48px)', maxWidth: '700px' }}>
			{children}
		</div>
	);
}
