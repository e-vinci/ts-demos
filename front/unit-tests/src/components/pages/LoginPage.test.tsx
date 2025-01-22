import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { describe, test, expect, vi } from 'vitest';
import LoginPage from '../../components/pages/LoginPage';
import { UserContext } from '../../contexts/UserContext';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('LoginPage', () => {
  test('renders a form with username and password inputs', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');

    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  test('calls loginUser and navigates to HomePage when the form is submitted', async () => {
    const loginUserMock = vi.fn();
    const navigateMock = vi.fn();
    const mockContextValue = {
      authenticatedUser: undefined,
      registerUser: vi.fn(),
      loginUser: loginUserMock,
      clearUser: vi.fn(),
    };

    vi.mocked(useNavigate).mockReturnValue(navigateMock);

    render(
      <MemoryRouter>
        <UserContext.Provider value={mockContextValue}>
          <LoginPage />
        </UserContext.Provider>
      </MemoryRouter>,
    );

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', {
      name: /s'authentifier/i,
    });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);

    expect(loginUserMock).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'password',
    });

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/');
    });
  });

  test('calls console.error when loginUser throws an error', async () => {
    const loginUserMock = vi
      .fn()
      .mockRejectedValueOnce(new Error('Login failed'));
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const mockContextValue = {
      authenticatedUser: undefined,
      registerUser: vi.fn(),
      loginUser: loginUserMock,
      clearUser: vi.fn(),
    };

    render(
      <MemoryRouter>
        <UserContext.Provider value={mockContextValue}>
          <LoginPage />
        </UserContext.Provider>
      </MemoryRouter>,
    );

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', {
      name: /s'authentifier/i,
    });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);

    expect(loginUserMock).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'password',
    });

    // Verify that console.error was called
    await waitFor(() => {
      expect(consoleErrorMock).toHaveBeenCalledWith(
        'LoginPage::error: ',
        expect.any(Error),
      );
    });

    consoleErrorMock.mockRestore();
  });
});
