import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import CardContent from '@material-ui/core/CardContent'

export default function Home() {
  return (
    <div>
      <Card elevation={0}>
        <Typography variant="h1" style={{ color: 'lightcoral' }}>
          browserql
        </Typography>
      </Card>

      <Card elevation={0}>
        <CardContent>
          <Typography component="p" style={{ color: 'royalblue' }}>
            browserql is a suite of packages loosely related to running a
            GraphQL server inside memory -- be it in browser, mobile or node.
          </Typography>
        </CardContent>
      </Card>

      <Card elevation={0}>
        <Typography component="p">Some examples of our packages:</Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="client"
              secondary="Create an in-memory GraphQL server"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="http"
              secondary="Fire HTTP queries using GraphQL"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="firestore"
              secondary="Fire Firestore queries using GraphQL"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="state"
              secondary="State management via apollo cache"
            />
          </ListItem>
        </List>
      </Card>
    </div>
  )
}
