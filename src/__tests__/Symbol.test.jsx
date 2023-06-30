import React from 'react';
import { render, screen } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Symbol from '../routes/Symbol';
import { getSymbol } from '../redux/symbol/symbolSlice';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../redux/symbol/symbolSlice', () => ({
  getSymbol: jest.fn(),
}));

describe('Symbol', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    useParams.mockReturnValue({ id: 'bitcoin' });
    useSelector.mockReturnValue({
      symbol: {
        data: {
          name: 'Bitcoin',
          symbol: 'BTC',
          priceUsd: '50000',
        },
      },
      isLoading: false,
    });
    useDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('dispatches getSymbol action with correct ID', () => {
    render(<Symbol />);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(getSymbol).toHaveBeenCalledWith('bitcoin');
  });

  test('renders symbol details correctly', () => {
    render(<Symbol />);

    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();

    expect(screen.getByText('symbol')).toBeInTheDocument();
    expect(screen.getByText('BTC')).toBeInTheDocument();

    expect(screen.getByText('priceUsd')).toBeInTheDocument();
    expect(screen.getByText('50000')).toBeInTheDocument();

    expect(screen.getByText('name')).toMatchSnapshot();
    expect(screen.getByText('symbol')).toMatchSnapshot();
    expect(screen.getByText('priceUsd')).toMatchSnapshot();
  });

  test('renders loading state', () => {
    useSelector.mockReturnValueOnce({ symbol: {}, isLoading: true });

    render(<Symbol />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toMatchSnapshot();
  });
});
