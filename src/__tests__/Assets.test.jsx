import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Assets from '../routes/Assets';
import { getAssets } from '../redux/assets/assetsSlice';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../redux/assets/assetsSlice', () => ({
  getAssets: jest.fn(),
}));

describe('Assets', () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockReturnValue({
      filterData: [
        {
          id: 1, symbol: 'BTC', name: 'Bitcoin', priceUsd: '50000',
        },
        {
          id: 2, symbol: 'ETH', name: 'Ethereum', priceUsd: '2000',
        },
      ],
      isLoading: false,
      error: undefined,
    });
    useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders assets correctly', () => {
    render(<Assets />);

    expect(screen.getByText('BTC')).toBeInTheDocument();
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText('U$D: 50000.0000')).toBeInTheDocument();

    expect(screen.getByText('ETH')).toBeInTheDocument();
    expect(screen.getByText('Ethereum')).toBeInTheDocument();
    expect(screen.getByText('U$D: 2000.0000')).toBeInTheDocument();

    expect(screen.getByText('BTC')).toMatchSnapshot();
    expect(screen.getByText('ETH')).toMatchSnapshot();
  });

  test('dispatches getAssets action if filterData is empty', () => {
    useSelector.mockReturnValueOnce({
      filterData: [],
      isLoading: false,
      error: undefined,
    });

    render(<Assets />);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(getAssets).toHaveBeenCalled();
  });

  test('navigates to asset details on button click', () => {
    render(<Assets />);

    const btcButton = screen.getByText('BTC');
    const ethButton = screen.getByText('ETH');

    btcButton.click();
    expect(mockNavigate).toHaveBeenCalledWith('/assets/1');

    ethButton.click();
    expect(mockNavigate).toHaveBeenCalledWith('/assets/2');
  });

  test('renders loading state', () => {
    useSelector.mockReturnValueOnce({
      filterData: [],
      isLoading: true,
      error: undefined,
    });

    render(<Assets />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toMatchSnapshot();
  });

  test('renders error message', () => {
    useSelector.mockReturnValueOnce({
      filterData: [],
      isLoading: false,
      error: 'Something went wrong',
    });

    render(<Assets />);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toMatchSnapshot();
  });
});
