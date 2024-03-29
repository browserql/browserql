import React from 'react'
import Chip from '@material-ui/core/Chip'
import Markdown from 'react-markdown'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import gfm from 'remark-gfm'

// import Code from './Code'

const renderers = {
  // code: ({ language, value }: { language: string; value: any }) => {
  //   return <Code language={language} value={value} />
  // },
  // list: List,
  // listItem: ({ children }: any) => {
  //   return (
  //     <ListItem button>
  //       <ListItemText primary={children[0].props.children[0].props.children} />
  //     </ListItem>
  //   )
  // },
  table: ({ children }: any) => {
    return (
      <Paper>
        <Table>{children}</Table>
      </Paper>
    )
  },
  tableHead: TableHead,
  tableBody: TableBody,
  tableRow: TableRow,
  tableCell: ({ children }: any) => {
    return <TableCell>{children}</TableCell>
  },
  inlineCode: ({ children }: any) => (
    <Chip
      color="primary"
      variant="outlined"
      label={children}
      component="span"
    />
  ),
  paragraph: ({ children }: any) => (
    <Typography
      style={{
        lineHeight: '22px',
        paddingTop: 8,
        paddingBottom: 8,
      }}
      variant="body1"
    >
      {children}
    </Typography>
  ),
  heading: ({ children, level }: any) => {
    let marginX = 0
    let variant = 'body1'
    let color = '#343434'
    if (level === 1) {
      marginX = 22
      variant = 'h1'
      color = 'lightcoral'
    } else if (level === 2) {
      marginX = 22
      variant = 'h2'
      color = 'lightslategrey'
    } else if (level === 3) {
      marginX = 16
      variant = 'h3'
      color = 'lightsteelblue'
    } else if (level === 4) {
      marginX = 12
    }
    return (
      <Typography
        variant={variant}
        style={{
          marginTop: marginX,
          marginBottom: marginX,
          color,
        }}
      >
        {children}
      </Typography>
    )
  },
}

export default function MD({ doc }: { doc: string }) {
  return (
    <Markdown plugins={[gfm]} renderers={renderers}>
      {doc}
    </Markdown>
  )
}
