import React from 'react'
import { UseQuery } from '@browserql/react'
import { parse } from 'graphql'

interface GetProps {
  get: string
}

type FirestoreProps = GetProps

export default function Firestore({ get }: FirestoreProps) {
  const source = `query FirestoreGet {
    firestoreGet${get} {
      title
    }
  }`
  return <UseQuery query={parse(source)}>{() => <div />}</UseQuery>
}
