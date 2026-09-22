/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { ConcernFinder } from '../../src/components/home/ConcernFinder';

describe('ConcernFinder Component', () => {
  it('renders step 1 with initial concern selection options', () => {
    render(
      <BrowserRouter>
        <ConcernFinder />
      </BrowserRouter>
    );

    expect(screen.getByText('Find Guidance for Your Concern')).toBeTruthy();
    expect(screen.getByText('Step 1 of 3')).toBeTruthy();
    expect(screen.getByText('1. What primary area is causing you discomfort?')).toBeTruthy();
    expect(screen.getByText('Back Pain')).toBeTruthy();
    expect(screen.getByText('Sciatica / Leg Pain')).toBeTruthy();
  });

  it('allows user to select concern and navigate through all 3 steps to view recommendation', () => {
    render(
      <BrowserRouter>
        <ConcernFinder />
      </BrowserRouter>
    );

    // Step 1: Select Back Pain
    const backPainBtn = screen.getByText('Back Pain');
    fireEvent.click(backPainBtn);

    // Verify Step 2 is displayed
    expect(screen.getByText('Step 2 of 3')).toBeTruthy();

    // Step 2: Select duration
    const durationBtn = screen.getByText('1–4 weeks');
    fireEvent.click(durationBtn);

    // Verify Step 3 is displayed
    expect(screen.getByText('Step 3 of 3')).toBeTruthy();

    // Step 3: Select impact level
    const impactBtn = screen.getByText(/Moderate/i);
    fireEvent.click(impactBtn);

    // Verify Summary & Guidance view is rendered
    expect(screen.getByText('Recommendation Summary')).toBeTruthy();
    expect(screen.getByText(/You reported experiencing/i)).toBeTruthy();
  });
});
