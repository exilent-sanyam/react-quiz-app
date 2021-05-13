import React from 'react'

type Props = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Restart: React.FunctionComponent<Props> = ({ onClick }) => (
  <button onClick={onClick}> Start Again!!!</button>
)

export default Restart
