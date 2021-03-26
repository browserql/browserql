import React, { useCallback, useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { RouteComponentProps, withRouter } from 'react-router';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

type Navigation = { name: string } & (
  | { nav: Navigation[] }
  | { examples: { name: string; example: string }[] }
);

interface Props {
  navigation: Navigation[];
}

function NavSection(
  item: Navigation & { history: RouteComponentProps['history'] }
) {
  const [toggled, setToggled] = useState(false);
  const toggle = useCallback(() => setToggled(!toggled), [toggled]);

  return (
    <div style={{ borderLeft: '2px solid #369' }}>
      <ListItem button>
        <ListItemText primary={item.name} onClick={toggle} />
        <ExpandMore
          onClick={toggle}
          style={{
            transition: 'all 0.25s ease-out',
            transform: `rotate(${toggled ? 180 : 0}deg)`,
          }}
        />
      </ListItem>
      <Collapse in={toggled}>
        {'nav' in item && (
          <List
            style={{
              paddingLeft: 12,
              paddingRight: 6,
            }}
          >
            {item.nav.map(subItem => (
              <NavSection
                {...{ ...subItem, history: item.history }}
                key={subItem.name}
              />
            ))}
          </List>
        )}
        {'examples' in item && (
          <List
            style={{
              paddingLeft: 12,
              paddingRight: 6,
            }}
          >
            {item.examples.map(ex => (
              <ListItem
                key={ex.name}
                button
                onClick={() => {
                  item.history.push(`/examples/${ex.example}`);
                }}
              >
                <ListItemText primary={ex.name} />
              </ListItem>
            ))}
          </List>
        )}
      </Collapse>
    </div>
  );
}

function Nav({ navigation, history }: Props & RouteComponentProps) {
  return (
    <List style={{ margin: 6 }}>
      {navigation.map(nav => (
        <NavSection history={history} {...nav} key={nav.name} />
      ))}
    </List>
  );
}

Nav.defaultProps = {
  navigation: [
    {
      name: 'Client',
      examples: [
        {
          name: 'Example',
          example: 'client/example',
        },
      ],
    },
    {
      name: 'GraphQL utilities',
      nav: [
        {
          name: 'cache',
          examples: [
            {
              name: 'Usage',
              example: 'cache/usage',
            },
          ],
        },
      ],
    },
    {
      name: 'Integrations',
      nav: [
        {
          name: 'React',
          nav: [
            {
              name: 'Components',
              examples: [
                {
                  name: 'Provider',
                  example: 'react/provider-component',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Misc',
      nav: [
        {
          name: 'FPQL',
          nav: [
            {
              name: 'Get',
              nav: [
                {
                  name: 'Fields',
                  examples: [
                    {
                      name: 'Get fields',
                      example: 'fpql/get-fields',
                    },
                  ],
                },
                {
                  name: 'Name',
                  examples: [
                    {
                      name: "Get type's name",
                      example: 'fpql/get-type-name',
                    },
                  ],
                },
                {
                  name: 'Type',
                  examples: [
                    {
                      name: 'Get type',
                      example: 'fpql/get-type',
                    },
                    {
                      name: 'Get types',
                      example: 'fpql/get-types',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'Types',
          examples: [
            {
              name: 'Usage',
              example: 'types/usage',
            },
          ],
        },
      ],
    },
  ],
} as Props;

export default withRouter(Nav);
