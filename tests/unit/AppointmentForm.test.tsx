/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { AppointmentForm } from '../../src/components/booking/AppointmentForm';

// Mock window.open to prevent jsdom errors
vi.stubGlobal('open', vi.fn());

describe('AppointmentForm Component', () => {
  it('renders required form input fields correctly', () => {
    render(<AppointmentForm />);

    expect(screen.getByText('Request Your Appointment')).toBeTruthy();
    expect(screen.getByPlaceholderText('e.g. Rahul Sharma')).toBeTruthy();
    expect(screen.getByPlaceholderText('e.g. 9876543210')).toBeTruthy();
  });

  it('shows validation errors when submitted empty', async () => {
    render(<AppointmentForm />);

    const submitBtn = screen.getByRole('button', { name: /Request via WhatsApp/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('Name must be at least 2 characters')).toBeTruthy();
      expect(screen.getByText('Please enter a valid 10-digit phone number')).toBeTruthy();
      expect(screen.getByText('Please select a preferred date')).toBeTruthy();
    });
  });
});
