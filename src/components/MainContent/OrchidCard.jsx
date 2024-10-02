import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import { Button, Rating } from "@mui/material";
import useModal from "../../hooks/useModal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CategoryIcon from "@mui/icons-material/Category";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useContext } from "react";
import { ThemeContext } from "../../themes/ThemeContext";

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

const MotionCard = motion(Card);

export default function OrchidCard({ orchid }) {
  const { isVisible, showModal, hideModal } = useModal({ orchid });
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const navigateDetailPage = () => {
    navigate(`/fer-lab1/${orchid.Id}`);
  };

  return (
    <>
      <MotionCard
        variant='outlined'
        sx={{
          width: 320,
          bgcolor: theme.card.backgroundColor,
          color: theme.card.color,
          borderColor: theme.divider,
        }}
        whileHover={{
          scale: 1.05,
          boxShadow: theme.elevation[3],
          transition: { duration: 0.3 },
        }}
      >
        <CardOverflow>
          <AspectRatio
            variant='outlined'
            ratio='2'
            onClick={() => showModal(orchid)}
          >
            <motion.img
              src={orchid.image + "?auto=format&fit=crop&w=318"}
              srcSet={orchid.image + "?auto=format&fit=crop&w=318&dpr=2 2x"}
              loading='lazy'
              alt={orchid.name}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
          </AspectRatio>
        </CardOverflow>
        <CardContent>
          <Typography
            level='title-md'
            sx={{ color: theme.text.primary, fontWeight: "bold", mb: 0.5 }}
          >
            {orchid.name}
          </Typography>
          <Box>
            <Typography
              level='body-sm'
              sx={{
                color: theme.text.secondary,
                mb: 2,
                alignItems: "center",
                display: "flex",
              }}
            >
              <LocationOnIcon
                sx={{
                  marginRight: "4px",
                  width: "16px",
                  color: theme.icon.color,
                }}
              />
              {orchid.origin}
            </Typography>
            <Typography
              level='body-sm'
              sx={{
                color: theme.text.secondary,
                mb: 2,
                alignItems: "center",
                display: "flex",
              }}
            >
              <CategoryIcon
                sx={{
                  marginRight: "4px",
                  width: "16px",
                  color: theme.icon.color,
                }}
              />
              {orchid.category}
            </Typography>
          </Box>
        </CardContent>
        <CardOverflow variant='soft' sx={{ bgcolor: theme.action.hover }}>
          <Divider inset='context' sx={{ bgcolor: theme.divider }} />
          <CardContent
            orientation='horizontal'
            sx={{ justifyContent: "space-between" }}
          >
            <Rating name='read-only' value={orchid.rating} readOnly />
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant='outlined'
                onClick={navigateDetailPage}
                sx={{
                  color: theme.button.primary,
                  borderColor: theme.button.primary,
                  "&:hover": {
                    backgroundColor: theme.button.hover,
                    borderColor: theme.button.hover,
                  },
                }}
              >
                Detail
              </Button>
            </motion.div>
          </CardContent>
        </CardOverflow>
      </MotionCard>

      <Modal
        open={isVisible}
        onClose={hideModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: theme.card.backgroundColor,
            border: `2px solid ${theme.divider}`,
            boxShadow: 24,
            p: 4,
            color: theme.card.color,
          }}
        >
          <Card>
            <CardOverflow>
              <AspectRatio ratio='2'>
                <img
                  src={orchid.image + "?auto=format&fit=crop&w=318"}
                  srcSet={orchid.image + "?auto=format&fit=crop&w=318&dpr=2 2x"}
                  loading='lazy'
                  alt={orchid.name}
                />
              </AspectRatio>
            </CardOverflow>
          </Card>
          <Typography
            id='modal-modal-description'
            sx={{ mt: 2, color: theme.text.primary }}
          >
            {orchid.detail}
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
