import '@testing-library/jest-dom/vitest';
import { configure } from '@testing-library/react';

// findBy* and waitFor give up after a second of their own, which a busy CI
// runner can pass while the test still has time left.
configure({ asyncUtilTimeout: 5000 });
