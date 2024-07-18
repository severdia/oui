import React from 'react';
import Table from '../../../src/components/Table';
import marked from 'marked';

const PropsTable = (props) => {
  let componentProps = props.componentProps;
  let data = [];

  if (componentProps) {
    Object.keys(componentProps).map((prop, i) => {

      // name with *required comment
      let propDisplayName = prop;
      if (componentProps[prop].required) {
        propDisplayName = '*' + prop + ' (required)';
      }

      // handle enum types
      let propDisplayType = componentProps[prop].type.name;
      if (propDisplayType === 'enum') {
        propDisplayType = (
          <Table>
            <Table.TBody>
              {
                componentProps[prop].type.value.map(v => {
                  return (
                    <Table.TR key={ v.value }>
                      <Table.TD>{ v.value }</Table.TD>
                    </Table.TR>
                  );
                })
              }
            </Table.TBody>
          </Table>
        );
      }

      data.push(
        [
          propDisplayName,
          propDisplayType,
          componentProps[prop].description,
        ]
      );
    });
  }

  return (
    <Table style="rule">
      <Table.THead>
        <Table.TR>
          <Table.TH width="22%">Prop</Table.TH>
          <Table.TH width="22%">Type</Table.TH>
          <Table.TH>Description</Table.TH>
        </Table.TR>
      </Table.THead>
      <Table.TBody>
        {
          data.map((prop) => {
            return (
              <Table.TR key={ prop[0] }>
                <Table.TD>{ prop[0] }</Table.TD>
                <Table.TD>{ prop[1] }</Table.TD>
                <Table.TD>
                  <span dangerouslySetInnerHTML={{ __html: marked.inlineLexer(prop[2], []) }}></span>
                </Table.TD>
              </Table.TR>
            );
          })
        }
      </Table.TBody>
    </Table>
  );
};

PropsTable.propTypes = {
  componentProps: React.PropTypes.object,
};

export default PropsTable;
