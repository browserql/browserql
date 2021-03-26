import React, { useCallback, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { RouteComponentProps, withRouter } from "react-router";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import navigation from "../navigation";

type Navigation = { name: string } & (
  | { nav: Navigation[] }
  | { examples: { name: string; example: string }[] }
);

interface Props {
  navigation?: Navigation[];
  toggle(): void;
}

function NavSection(
  item: Navigation & { history: RouteComponentProps["history"]; toggle(): void }
) {
  const [toggled, setToggled] = useState(false);
  const toggle = useCallback(() => setToggled(!toggled), [toggled]);

  return (
    <div style={{ borderLeft: "2px solid #369" }}>
      <ListItem button>
        <ListItemText primary={item.name} onClick={toggle} />
        <ExpandMore
          onClick={toggle}
          style={{
            transition: "all 0.25s ease-out",
            transform: `rotate(${toggled ? 180 : 0}deg)`,
          }}
        />
      </ListItem>
      <Collapse in={toggled}>
        {"nav" in item && (
          <List
            style={{
              paddingLeft: 12,
              paddingRight: 6,
            }}
          >
            {item.nav.map((subItem) => (
              <NavSection
                {...{ ...subItem, history: item.history, toggle: item.toggle }}
                key={subItem.name}
              />
            ))}
          </List>
        )}
        {"examples" in item && (
          <List
            style={{
              paddingLeft: 12,
              paddingRight: 6,
            }}
          >
            {item.examples.map((ex) => (
              <ListItem
                key={ex.name}
                button
                onClick={() => {
                  item.toggle();
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

function Nav({ navigation, history, toggle }: Props & RouteComponentProps) {
  return (
    <List style={{ margin: 6 }}>
      {(navigation as Navigation[]).map((nav) => (
        <NavSection history={history} {...nav} key={nav.name} toggle={toggle} />
      ))}
    </List>
  );
}

Nav.defaultProps = navigation as Props;

export default withRouter(Nav);
