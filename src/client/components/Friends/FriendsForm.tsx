import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import { AiOutlineSave } from "@react-icons/all-files/ai/AiOutlineSave";
import { useRouter } from "next/router";
import { useCreateFriendMutation } from "../../graphql/createFriend.generated";
import { FormButtonContainer } from "../utils/styledComponents";

const AddFriend = ({ currentUserId }) => {
  const router = useRouter();
  const [, createFriend] = useCreateFriendMutation();
  const [id, setId] = useState("");
  return (
    <>
      <div className="cp-c-row cp-c-wrap cp-c-padding-2 cp-c-lg-padding-3">
        <div className="cp-i-100 cp-i-sm-50 cp-i-md-33">
          <TextField
            fullWidth
            error={id == currentUserId || id.length !== 25}
            helperText={
              id == currentUserId
                ? "Cannot enter own userID."
                : "UserID has to be 25 characters long."
            }
            value={id}
            label="Friend Id"
            variant="outlined"
            onChange={(evt) => setId(evt.target.value)}
          />
        </div>
      </div>

      <FormButtonContainer>
        <Button
          size="large"
          fullWidth
          startIcon={<AiOutlineSave />}
          variant="contained"
          disabled={!id || id == currentUserId || id.length !== 25}
          onClick={() => {
            if (!id) return;
            toast
              .promise(
                createFriend({
                  id,
                }),
                {
                  loading: `Adding new friend...`,
                  success: `New friend added!`,
                  error: (err) => err,
                }
              )
              .then(() => {
                router.push(`/friends`);
              });
          }}
        >
          Save
        </Button>
      </FormButtonContainer>
    </>
  );
};

export default AddFriend;
