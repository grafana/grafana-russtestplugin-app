import React from 'react';
import { screen, within } from '@testing-library/react';
import { DataTestIds } from 'test/dataTestIds';
import { DEFAULT_PROBES, PRIVATE_PROBE, PUBLIC_PROBE } from 'test/fixtures/probes';
import { render } from 'test/render';

import { ROUTES } from 'types';
import { getRoute } from 'components/Routing';

import { Probes } from './Probes';
import 'test/silenceErrors';

const renderProbeList = () => {
  return render(<Probes />);
};

it('renders offline probes', async () => {
  renderProbeList();
  const onlineStatus = await screen.findAllByText('Offline');
  expect(onlineStatus.length).toBe(DEFAULT_PROBES.filter((p) => !p.online).length);
});

it('renders online probes', async () => {
  renderProbeList();
  const onlineStatus = await screen.findAllByText('Online');
  expect(onlineStatus.length).toBe(DEFAULT_PROBES.filter((p) => p.online).length);
});

it(`renders private probes in the correct list`, async () => {
  renderProbeList();
  const privateProbesList = await screen.findByTestId(DataTestIds.PRIVATE_PROBES_LIST);
  const privateProbe = await within(privateProbesList).findByText(PRIVATE_PROBE.name);
  expect(privateProbe).toBeInTheDocument();
});

it(`renders public probes in the correct list`, async () => {
  renderProbeList();
  const publicProbesList = await screen.findByTestId(DataTestIds.PUBLIC_PROBES_LIST);
  const publicProbe = await within(publicProbesList).findByText(PUBLIC_PROBE.name);
  expect(publicProbe).toBeInTheDocument();
});

it('handles add new', async () => {
  const { history, user } = renderProbeList();
  const addNewButton = await screen.findByRole('link', { name: 'Add Private Probe' });
  await user.click(addNewButton);

  expect(history.location.pathname).toBe(getRoute(ROUTES.NewProbe));
});
