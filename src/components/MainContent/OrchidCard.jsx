import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import { Rating } from "@mui/material";
import useModal from "../../hooks/useModal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "black",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  color: "white",
};

export default function OrchidCard({ orchid }) {
  const { isVisible, detail, showModal, hideModal } = useModal({ orchid });

  return (
    <>
      <Card
        variant='solid'
        sx={{
          width: 320,
          bgcolor: "black",
          color: "white",
          "&:hover": {
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
          },
        }}
        onClick={() => showModal(orchid)}
      >
        <CardOverflow>
          <AspectRatio ratio='2'>
            <img
              src={orchid.image + "?auto=format&fit=crop&w=318"}
              srcSet={orchid.image + "?auto=format&fit=crop&w=318&dpr=2 2x"}
              loading='lazy'
              alt=''
            />
          </AspectRatio>
        </CardOverflow>
        <CardContent>
          <Typography
            level='title-md'
            sx={{ color: "white", fontWeight: "bold", mb: 0.5 }}
          >
            {orchid.name}
          </Typography>
          <Typography level='body-sm' sx={{ color: "grey.400", mb: 2 }}>
            {orchid.origin}
          </Typography>
        </CardContent>
        <CardOverflow
          variant='soft'
          sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }}
        >
          <Divider inset='context' sx={{ bgcolor: "white" }} />
          <CardContent orientation='horizontal'>
            {/* <Typography
            level="body-xs"
            textColor="text.secondary"
            sx={{
              fontWeight: "md",
              color: "white",
            }}
          >
            {orchid.rating} rating
          </Typography> */}
            <Rating name='read-only' value={orchid.rating} readOnly />
            <Divider orientation='vertical' sx={{ color: "white" }} />
            <Typography
              level='body-xs'
              textColor='text.secondary'
              sx={{
                fontWeight: "md",
                color: "white",
              }}
            >
              {orchid.category}
            </Typography>
          </CardContent>
        </CardOverflow>
      </Card>

      <Modal
        open={isVisible}
        onClose={hideModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Card>
            <CardOverflow>
              <AspectRatio ratio='2'>
                <img
                  src={orchid.image + "?auto=format&fit=crop&w=318"}
                  srcSet={orchid.image + "?auto=format&fit=crop&w=318&dpr=2 2x"}
                  loading='lazy'
                  alt=''
                />
              </AspectRatio>
            </CardOverflow>
          </Card>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {orchid.detail}
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
