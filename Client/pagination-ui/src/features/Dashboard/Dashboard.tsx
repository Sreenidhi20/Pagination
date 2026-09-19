import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Typography,
} from "@mui/material";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}
      >
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700 }}>
          Pagination
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
            width: "100%",
          }}
        >
          <Card
            sx={{
              width: 260,
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            <CardActionArea
              onClick={() => navigate("/offset-pagination")}
              sx={{
                minHeight: 180,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: 600, textAlign: "center" }}
                >
                  Offset
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1, textAlign: "center" }}
                >
                  Offset Pagination
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card
            sx={{
              width: 260,
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            <CardActionArea
              onClick={() => navigate("/cursor-pagination")}
              sx={{
                minHeight: 180,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: 600, textAlign: "center" }}
                >
                  Cursor
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1, textAlign: "center" }}
                >
                  Cursor Pagination
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
