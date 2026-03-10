import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./Inputs.css";

const schema = yup.object({
  service: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required(),
}).required();

const Inputs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const res = await fetch("http://localhost:8001/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    const result = await res.json();
    console.log(result);
  };

  return (
    <section className="add-password">
      <h2>Add New Password</h2>
      <form className="inputs-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <div className="field">
            <input {...register("service")} placeholder="Service" />
            <p className="error">{errors.service?.message}</p>
          </div>
          <div className="field">
            <input {...register("email")} placeholder="Email" />
            <p className="error">{errors.email?.message}</p>
          </div>
          <div className="field">
            <input {...register("password")} placeholder="Password" />
            <p className="error">{errors.password?.message}</p>
          </div>
        </div>
        <button className="save-btn" type="submit">Save Password</button>
      </form>
    </section>
  );
};

export default Inputs;