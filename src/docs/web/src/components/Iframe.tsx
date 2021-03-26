import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

export default withRouter(function Iframe(
  props: RouteComponentProps<{ module: string; example: string }>
) {
  return (
    <iframe
      style={{ border: 'none', width: '100%' }}
      src={`/embed/${props.match.params.module}/${props.match.params.example}`}
    ></iframe>
  );
});
