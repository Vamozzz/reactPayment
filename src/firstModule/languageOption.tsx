import * as React from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import { Divider } from "@mui/material";
import xcircle from "../assets/xcircle.svg"

const languages = [
  "English",
  "हिंदी",
  "বাংলা",
  "मराठी",
  "ગુજરાતી",
  "தமிழ்",
  "తెలుగు",
];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <div className="flex justify-center items-center">
        <DialogTitle>Change Language</DialogTitle>
        <ListItemAvatar onClick={handleClose}>
          {/* <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
            <PersonIcon />
          </Avatar> */}
          <img src={xcircle} alt="." height={40} width={40} />
        </ListItemAvatar>
      </div>
      <List sx={{ pt: 0 }}>
        {languages.map((language) => (
          <div key={language}>
            <ListItem disableGutters>
              <ListItemButton onClick={() => handleListItemClick(language)}>
                {/* <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar> */}
                <ListItemText primary={language} />
              </ListItemButton>
            </ListItem>
            <Divider className="mx-4" />
          </div>
        ))}
        {/* <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={() => handleListItemClick("addAccount")}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItemButton>
        </ListItem> */}
      </List>
    </Dialog>
  );
}

interface SimpleDialogDemoProps {
  language: boolean;
  setLanguage: (value: string) => void;
  selectLanguage: (value: string) => void;
}

export default function SimpleDialogDemo({
  language,
  setLanguage,
  selectLanguage,
}: SimpleDialogDemoProps) {
  //   const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = (value: string) => {
  //     setOpen(false);
  //     setSelectedValue(value);
  //   };

  return (
    <div>
      <SimpleDialog
        selectedValue={"english"}
        open={language}
        onClose={selectLanguage}
      />
    </div>
  );
}
