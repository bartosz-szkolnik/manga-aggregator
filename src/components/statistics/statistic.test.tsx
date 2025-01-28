import { describe, expect, test } from 'vitest';
import { render, screen } from '@test/react-test-utils';
import { Statistic } from './statistic';
import { BookCheck } from 'lucide-react';

function Statistics() {
  return (
    <Statistic title="Mangas read" icon={BookCheck}>
      <div>{10}</div>
      <p>Good job and keep going!</p>
    </Statistic>
  );
}

describe('Statistic', () => {
  test('should render component', () => {
    render(<Statistics />);

    expect(screen.getByRole('heading', { name: /mangas read/i })).toBeInTheDocument();
    expect(screen.getByText(/10/i)).toBeInTheDocument();
    expect(screen.getByText(/good job and keep going!/i)).toBeInTheDocument();
  });
});
