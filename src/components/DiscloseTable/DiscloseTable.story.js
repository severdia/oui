import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import DiscloseTable from './index.js';
import Table from '../Table';

const stories = storiesOf('DiscloseTable', module);
stories
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div id="root-preview">
      {story()}
    </div>
  ));

stories
  .add('Default', (() => (<div>
    <DiscloseTable>
      <Table.THead>
        <Table.TR>
          <Table.TH isCollapsed={ true }></Table.TH>
          <Table.TH>Experiment Name</Table.TH>
          <Table.TH isNumerical={ true }>Start Date</Table.TH>
          <Table.TH isNumerical={ true }>End Date</Table.TH>
          <Table.TH isNumerical={ true }>Visitors</Table.TH>
          <Table.TH>Status</Table.TH>
          <Table.TH>Project</Table.TH>
          <Table.TH isNumerical={ true }><div className="push-half--right">Type</div></Table.TH>
        </Table.TR>
      </Table.THead>
      <Table.TBody>
        <DiscloseTable.Row
          rowContents={ [
            <Table.TD key={ 'exp_name' } verticalAlign="middle">Experiment 1</Table.TD>,
            <Table.TD key={ 'exp_start_date' } isNumerical={ true } verticalAlign="middle">May 5, 2018</Table.TD>,
            <Table.TD key={ 'exp_end_date' } isNumerical={ true } verticalAlign="middle">June 1, 2018</Table.TD>,
            <Table.TD key={ 'exp_visiors' } isNumerical={ true } verticalAlign="middle">358</Table.TD>,
            <Table.TD key={ 'exp_status' } verticalAlign="middle">Running</Table.TD>,
            <Table.TD key={ 'exp_project' } verticalAlign="middle">
              Optimizely App - Web long name contains a long list of characters which is totally unexpetected
            </Table.TD>,
            <Table.TD key={ 'exp_type' } isNumerical={ true } verticalAlign="middle">
              <div className="push-half--right">A/B</div>
            </Table.TD>,
          ]
          }>
          <div className="flex soft-double--sides">
            <div>
              <Table>
                <Table.THead>
                  <Table.TR>
                    <Table.TH>Variations</Table.TH>
                    <Table.TH>Recorded Results</Table.TH>
                  </Table.TR>
                </Table.THead>
                <Table.TBody>
                  <Table.TR>
                    <Table.TD><span className="soft--right muted">A</span>Variation name short</Table.TD>
                    <Table.TD>Not Analyzed</Table.TD>
                  </Table.TR>
                  <Table.TR>
                    <Table.TD>
                      <span className="soft--right muted">B</span>
                      Variation name long contains a lot of characters as you can see here as well.
                    </Table.TD>
                    <Table.TD>Win</Table.TD>
                  </Table.TR>
                  <Table.TR>
                    <Table.TD><span className="soft--right muted">C</span>Variation name short</Table.TD>
                    <Table.TD>Baseline</Table.TD>
                  </Table.TR>
                </Table.TBody>
              </Table>
            </div>
            <div className="soft-double--right">
              <Table>
                <Table.THead>
                  <Table.TR>
                    <Table.TH>Idea</Table.TH>
                  </Table.TR>
                </Table.THead>
                <Table.TBody>
                  <Table.TR>
                    <Table.TD><a>Rollout MGMT to specific users</a></Table.TD>
                  </Table.TR>
                </Table.TBody>
              </Table>
              <Table>
                <Table.THead>
                  <Table.TR>
                    <Table.TH>Analysis</Table.TH>
                  </Table.TR>
                </Table.THead>
                <Table.TBody>
                  <Table.TR>
                    <Table.TD>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi id voluptas vitae eius
                                  expedita alias iste deserunt rndis earum voluptatibus quae, numquam dolorum perspiciatis
                                  accusantium corporis, beatae maxime quasi. Tempora.</p>
                    </Table.TD>
                  </Table.TR>
                </Table.TBody>
              </Table>
            </div>
          </div>
        </DiscloseTable.Row>
        <DiscloseTable.Row
          rowContents={ [
            <Table.TD key={ 'exp_name' }>
              Experiment 2 has a very long name as you can see as well here that its a really long name
            </Table.TD>,
            <Table.TD key={ 'exp_start_date' } isNumerical={ true } verticalAlign="middle">May 5, 2018</Table.TD>,
            <Table.TD key={ 'exp_end_date' } isNumerical={ true } verticalAlign="middle">June 1, 2018</Table.TD>,
            <Table.TD key={ 'exp_visiors' } isNumerical={ true } verticalAlign="middle">358</Table.TD>,
            <Table.TD key={ 'exp_status' } verticalAlign="middle">Paused</Table.TD>,
            <Table.TD key={ 'exp_project' } verticalAlign="middle">Optimizely App - Web long name...</Table.TD>,
            <Table.TD key={ 'exp_type' } isNumerical={ true } verticalAlign="middle">
              <div className="push-half--right">A/B</div>
            </Table.TD>,
          ]
          }>
          <p className="soft--sides">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi id voluptas vitae eius
          expedita alias iste deserunt rndis earum voluptatibus quae, numquam dolorum perspiciatis
          accusantium corporis, beatae maxime quasi. Tempora.</p>
        </DiscloseTable.Row>
      </Table.TBody>
    </DiscloseTable>
  </div>)));
