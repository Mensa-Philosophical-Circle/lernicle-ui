import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { ErrorAlert } from './index';

describe('ErrorAlert', () => {
  it('renders a single error message', () => {
    render(
      <ErrorAlert errors="Network error" title="Upload Failed" type="error" />,
    );
    expect(screen.getByText('Upload Failed')).toBeInTheDocument();
    expect(screen.getByText('Network error')).toBeInTheDocument();
  });

  it('renders multiple error messages as a list', () => {
    render(
      <ErrorAlert
        errors={['Error 1', 'Error 2']}
        title="Format Issues"
        type="warning"
      />,
    );
    expect(screen.getByText('Format Issues')).toBeInTheDocument();
    expect(screen.getByText('Error 1')).toBeInTheDocument();
    expect(screen.getByText('Error 2')).toBeInTheDocument();
  });

  it('renders success state', () => {
    render(<ErrorAlert title="Ready to upload" type="success" />);
    expect(screen.getByText('Ready to upload')).toBeInTheDocument();
  });

  it('renders footer if provided', () => {
    render(
      <ErrorAlert
        errors={['Err']}
        footer={<span>Footer text</span>}
        title="Issues"
        type="warning"
      />,
    );
    expect(screen.getByText('Footer text')).toBeInTheDocument();
  });

  it('does not render if not success and no errors', () => {
    const { container } = render(
      <ErrorAlert errors={[]} title="Issues" type="error" />,
    );

    expect(container.firstChild).toBeNull();
  });
});
