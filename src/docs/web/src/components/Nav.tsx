import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { RouteComponentProps, withRouter } from 'react-router';

type Navigation = { name: string } & (
  | { nav: Navigation[] }
  | { examples: { name: string; example: string }[] }
);

interface Props {
  navigation: Navigation[];
}

function Nav({ navigation, history }: Props & RouteComponentProps) {
  return (
    <nav>
      {navigation.map(nav => {
        return (
          <Accordion
            key={nav.name}
            elevation={1}
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.35)' }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography>{nav.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ flex: 1 }}>
                {'nav' in nav && <Nav navigation={nav.nav} history={history} />}
                {'examples' in nav && (
                  <List>
                    {nav.examples.map(ex => (
                      <ListItem
                        key={ex.name}
                        button
                        onClick={() => {
                          history.push(`/examples/${ex.example}`);
                        }}
                      >
                        <ListItemText primary={ex.name} />
                      </ListItem>
                    ))}
                  </List>
                )}
              </div>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </nav>
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
          name: 'fpql',
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
      ],
    },
    {
      name: 'Misc',
      nav: [
        {
          name: 'Types',
          examples: [
            {
              name: 'About',
              example: 'types/about',
            },
          ],
        },
      ],
    },
  ],
} as Props;

export default withRouter(Nav);
