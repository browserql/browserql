import React from 'react'
// import Chip from '@material-ui/core/Chip'
import Markdown from 'react-markdown'
// import Paper from '@material-ui/core/Paper'
// import Table from '@material-ui/core/Table'
// import TableBody from '@material-ui/core/TableBody'
// import TableCell from '@material-ui/core/TableCell'
// import TableHead from '@material-ui/core/TableHead'
// import TableRow from '@material-ui/core/TableRow'
// import Typography from '@material-ui/core/Typography'
// import gfm from 'remark-gfm'

// import Code from './Code'

export default function MD({ doc }: { doc: string }) {
  return <Markdown components={{}}>{doc}</Markdown>
}
