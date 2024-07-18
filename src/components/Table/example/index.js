/* eslint-disable react/jsx-key */
import React from 'react';
import Table from '../index';
import Button from '../../Button';

export default [
  {
    isPadded: true,
    examples: [
      <Table density="loose">
        <Table.THead>
          <Table.TR>
            <Table.TH>Experiment</Table.TH>
            <Table.TH>Conversion Rate</Table.TH>
            <Table.TH>Status</Table.TH>
          </Table.TR>
        </Table.THead>
        <Table.TBody>
          <Table.TR>
            <Table.TD>Header CTA</Table.TD>
            <Table.TD width="20%">12%</Table.TD>
            <Table.TD>Paused</Table.TD>
          </Table.TR>
          <Table.TR>
            <Table.TD>Shorter Contact Form</Table.TD>
            <Table.TD>4%</Table.TD>
            <Table.TD>Draft</Table.TD>
          </Table.TR>
          <Table.TR>
            <Table.TD>Larger search bar</Table.TD>
            <Table.TD>6.7%</Table.TD>
            <Table.TD>Paused</Table.TD>
          </Table.TR>
          <Table.TR>
            <Table.TD>Center aligned headline</Table.TD>
            <Table.TD>9.3%</Table.TD>
            <Table.TD>Running</Table.TD>
          </Table.TR>
        </Table.TBody>
      </Table>,
    ],
  },
  {
    isPadded: true,
    examples: [
      <Table style="rule" density="loose">
        <Table.THead>
          <Table.TR>
            <Table.TH>Experiment</Table.TH>
            <Table.TH isNumerical={ true }>Conversion Rate</Table.TH>
            <Table.TH>Status</Table.TH>
          </Table.TR>
        </Table.THead>
        <Table.TBody>
          <Table.TR>
            <Table.TD>Header CTA</Table.TD>
            <Table.TD isNumerical={ true }>12%</Table.TD>
            <Table.TD>Paused</Table.TD>
          </Table.TR>
          <Table.TR>
            <Table.TD>Shorter Contact Form</Table.TD>
            <Table.TD isNumerical={ true }>4%</Table.TD>
            <Table.TD>Draft</Table.TD>
          </Table.TR>
          <Table.TR>
            <Table.TD>Larger search bar</Table.TD>
            <Table.TD isNumerical={ true }>6.7%</Table.TD>
            <Table.TD>Paused</Table.TD>
          </Table.TR>
          <Table.TR>
            <Table.TD>Center aligned headline</Table.TD>
            <Table.TD isNumerical={ true }>9.3%</Table.TD>
            <Table.TD>Running</Table.TD>
          </Table.TR>
        </Table.TBody>
      </Table>,
    ],
  },
  {
    isPadded: true,
    examples: [
      <Table style="rule-no-bottom-border">
        <Table.THead>
          <Table.TR>
            <Table.TH>Experiment</Table.TH>
            <Table.TH isNumerical={ true }>Conversion Rate</Table.TH>
            <Table.TH>Status</Table.TH>
          </Table.TR>
        </Table.THead>
        <Table.TBody>
          <Table.TR>
            <Table.TD>Header CTA</Table.TD>
            <Table.TD isNumerical={ true }>12%</Table.TD>
            <Table.TD>Paused</Table.TD>
          </Table.TR>
          <Table.TR>
            <Table.TD>Shorter Contact Form</Table.TD>
            <Table.TD isNumerical={ true }>4%</Table.TD>
            <Table.TD>Draft</Table.TD>
          </Table.TR>
          <Table.TR>
            <Table.TD>Larger search bar</Table.TD>
            <Table.TD isNumerical={ true }>6.7%</Table.TD>
            <Table.TD>Paused</Table.TD>
          </Table.TR>
          <Table.TR>
            <Table.TD>Center aligned headline</Table.TD>
            <Table.TD isNumerical={ true }>9.3%</Table.TD>
            <Table.TD>Running</Table.TD>
          </Table.TR>
        </Table.TBody>
      </Table>,
    ],
  },
  {
    isPadded: true,
    examples: [
      <Table
        style="wall"
        tableLayoutAlgorithm="auto">
        <Table.THead>
          <Table.TR>
            <Table.TH>Experiment</Table.TH>
            <Table.TH isNumerical={ true } width="20%">Conversion Rate</Table.TH>
            <Table.TH isCollapsed={ true }>Status</Table.TH>
          </Table.TR>
        </Table.THead>
        <Table.TBody>
          <Table.TR>
            <Table.TD verticalAlign="middle">Header CTA</Table.TD>
            <Table.TD isNumerical={ true } verticalAlign="middle">12%</Table.TD>
            <Table.TD verticalAlign="middle"><Button size="small">Start</Button></Table.TD>
          </Table.TR>
          <Table.TR>
            <Table.TD verticalAlign="middle">Shorter Contact Form</Table.TD>
            <Table.TD isNumerical={ true } verticalAlign="middle">4%</Table.TD>
            <Table.TD verticalAlign="middle"><Button size="small">Start</Button></Table.TD>
          </Table.TR>
          <Table.TR>
            <Table.TD verticalAlign="middle">Larger search bar</Table.TD>
            <Table.TD isNumerical={ true } verticalAlign="middle">6.7%</Table.TD>
            <Table.TD verticalAlign="middle"><Button size="small">Start</Button></Table.TD>
          </Table.TR>
          <Table.TR>
            <Table.TD verticalAlign="middle">Center aligned headline</Table.TD>
            <Table.TD isNumerical={ true } verticalAlign="middle">9.3%</Table.TD>
            <Table.TD verticalAlign="middle"><Button size="small">Start</Button></Table.TD>
          </Table.TR>
        </Table.TBody>
      </Table>,
    ],
  },
  {
    isPadded: true,
    examples: [
      <Table tableLayoutAlgorithm="auto">
        <Table.THead>
          <Table.TR>
            <Table.TH>Experiment</Table.TH>
            <Table.TH isNumerical={ true } width="20%">Conversion Rate</Table.TH>
            <Table.TH isCollapsed={ true }>Status</Table.TH>
          </Table.TR>
        </Table.THead>
        <Table.TBody>
          <Table.TR>
            <Table.TD verticalAlign="middle">Header CTA</Table.TD>
            <Table.TD isNumerical={ true } verticalAlign="middle">12%</Table.TD>
            <Table.TD verticalAlign="middle"><Button size="small">Start</Button></Table.TD>
          </Table.TR>
          <Table.TR>
            <Table.TD verticalAlign="middle">Shorter Contact Form</Table.TD>
            <Table.TD isNumerical={ true } verticalAlign="middle">4%</Table.TD>
            <Table.TD verticalAlign="middle"><Button size="small">Start</Button></Table.TD>
          </Table.TR>
          <Table.TR>
            <Table.TD verticalAlign="middle">Larger search bar</Table.TD>
            <Table.TD isNumerical={ true } verticalAlign="middle">6.7%</Table.TD>
            <Table.TD verticalAlign="middle"><Button size="small">Start</Button></Table.TD>
          </Table.TR>
          <Table.TR>
            <Table.TD colSpan={ 3 }>Cell Spanning Three Columns</Table.TD>
          </Table.TR>
        </Table.TBody>
      </Table>,
    ],
  },
  {
    isPadded: true,
    examples: [
      <Table density="loose">
        <Table.THead>
          <Table.TR>
            <Table.TH colSpan={ 2 }>Experiment with colspan of 2</Table.TH>
            <Table.TH>Conversion Rate</Table.TH>
            <Table.TH>Status</Table.TH>
          </Table.TR>
        </Table.THead>
        <Table.TBody>
          <Table.TR>
            <Table.TD colSpan={ 2 }>Header CTA</Table.TD>
            <Table.TD width="20%">12%</Table.TD>
            <Table.TD>Paused</Table.TD>
          </Table.TR>
          <Table.TR>
            <Table.TD colSpan={ 2 }>Shorter Contact Form</Table.TD>
            <Table.TD>4%</Table.TD>
            <Table.TD>Draft</Table.TD>
          </Table.TR>
          <Table.TR>
            <Table.TD colSpan={ 2 }>Larger search bar</Table.TD>
            <Table.TD>6.7%</Table.TD>
            <Table.TD>Paused</Table.TD>
          </Table.TR>
          <Table.TR>
            <Table.TD colSpan={ 2 }>Center aligned headline</Table.TD>
            <Table.TD>9.3%</Table.TD>
            <Table.TD>Running</Table.TD>
          </Table.TR>
        </Table.TBody>
      </Table>,
    ],
  },
];
