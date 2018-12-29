import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default class ChatBody extends Component {
  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired
    })).isRequired
  }

  render() {
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Message</TableCell>
              {/* <TableCell numeric>Qty.</TableCell>
              <TableCell numeric>@</TableCell>
              <TableCell numeric>Price</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              this.props.messages.map(message => (
                <TableRow key={message.id}>
                  <TableCell>{message.name}</TableCell>
                  <TableCell>{message.message}</TableCell>
                </TableRow>
              ))
            }
            {/* {rows.map(row => {
              return (
                <TableRow key={row.id}>
                  <TableCell>{row.desc}</TableCell>
                  <TableCell numeric>{row.qty}</TableCell>
                  <TableCell numeric>{row.unit}</TableCell>
                  <TableCell numeric>{ccyFormat(row.price)}</TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell numeric>{ccyFormat(invoiceSubtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tax</TableCell>
              <TableCell numeric>{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
              <TableCell numeric>{ccyFormat(invoiceTaxes)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell numeric>{ccyFormat(invoiceTotal)}</TableCell>
            </TableRow> */}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}
