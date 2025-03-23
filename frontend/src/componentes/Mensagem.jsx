
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material'
import Alert from '@mui/material/Alert'
import { Link } from 'react-router-dom'

export default function Mensagem({ open, onClose, titulo, tipo, mensagem, link, textoBotao }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{titulo}</DialogTitle>
            <DialogContent>
                <Alert severity={tipo}>
                    <DialogContentText>{mensagem}</DialogContentText>
                </Alert>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                <Link to={link}>{ textoBotao }</Link>
                </Button>
            </DialogActions>
        </Dialog>
    )
}
