import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Grid,
} from "@mui/material";

import {
  FormContainer,
  TextFieldElement,
  DatePickerElement,
  SwitchElement,
  RadioButtonGroup,
} from "react-hook-form-mui";

import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

const schema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  phoneNumber: Joi.number(),
  dob: Joi.date().required(),
  gender: Joi.string().min(1).max(1).required(),
  address: Joi.string(),
  isStaff: Joi.boolean().required(),
  degree: Joi.number().required().allow(null),
  specialty: Joi.number().required().allow(null),
  examinationFee: Joi.number().required(),
  isAdmin: Joi.boolean().default(false).required(),
});

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phoneNumber: "",
  dob: "",
  gender: "",
  address: "",
  isStaff: true,
  degree: null,
  specialty: null,
  examinationFee: 0,
  isAdmin: false,
};

function CreateDoctorForm() {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState();

  const formContext = useForm({
    defaultValues: defaultValues,
    resolver: joiResolver(schema),
  });

  const { handleSubmit, formState } = formContext;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data) => {
    setValues(formState);
  };

  const checkError = () => {
    console.log(formState.errors);
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Thêm bác sĩ mới
      </Button>
      <Dialog disableEscapeKeyDown fullWidth maxWidth="md" open={open}>
        <DialogTitle>
          <Typography variant="h5" component="p">
            Thêm bác sĩ mới
          </Typography>
        </DialogTitle>
        <DialogContent>
          <FormContainer formContext={formContext} onSuccess={onSubmit}>
            <button onClick={checkError}>submit</button>
            <Box>
              <Typography variant="h6" mt={2} mb={1}>
                Thông tin cơ bản
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextFieldElement fullWidth name="firstName" label="Tên" />
                </Grid>
                <Grid item xs={6}>
                  <TextFieldElement fullWidth name="lastName" label="Họ" />
                </Grid>
                <Grid item xs={6}>
                  <RadioButtonGroup
                    fullWidth
                    name="gender"
                    label="Giới tính"
                    options={[
                      { id: "M", label: "Nam" },
                      { id: "F", label: "Nữ" },
                    ]}
                  />
                </Grid>
                <Grid item xs={6}>
                  <DatePickerElement fullWidth name="dob" label="Ngày sinh" />
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Typography variant="h6" mt={2} mb={1}>
                Thông tin tài khoản
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextFieldElement fullWidth name="email" label="Email" />
                </Grid>
                <Grid item xs={6}>
                  <TextFieldElement
                    fullWidth
                    name="password"
                    label="Mật khẩu"
                  />
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Typography variant="h6" mt={2} mb={1}>
                Thông tin liên hệ
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextFieldElement
                    fullWidth
                    name="phoneNumber"
                    label="Số điện thoại"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextFieldElement fullWidth name="address" label="Địa chỉ" />
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Typography variant="h6" mt={2} mb={1}>
                Thông tin nghề nghiệp
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextFieldElement fullWidth name="degree" label="Chức danh" />
                </Grid>
                <Grid item xs={6}>
                  <TextFieldElement
                    fullWidth
                    name="examinationFee"
                    label="Giá khám"
                  />
                </Grid>
                <Grid item xs={6}>
                  <SwitchElement name="isAdmin" label="Nhân viên quản lý" />
                </Grid>
              </Grid>
            </Box>
          </FormContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Tạo mới
          </Button>
        </DialogActions>
      </Dialog>
      <div>
        Data:
        <br />
        {JSON.stringify(values)}
      </div>
    </>
  );
}

export default CreateDoctorForm;
