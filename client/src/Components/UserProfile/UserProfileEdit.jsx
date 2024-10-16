import { useEffect, useState } from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom";
import {
  GetBiometricsByUserId,
  updateBiometrics,
} from "../../Managers/BiometricManager";
import { Input, Label, Tooltip } from "reactstrap";

export const BiometricsEdit = ({ currentUser }) => {
  const [biometrics, setBiometrics] = useState({});
  const [toolTipOpen1, setToolTipOpen1] = useState(false);
  const toggle1 = () => setToolTipOpen1(!toolTipOpen1);
  const navigate = useNavigate();
  const user = currentUser;
  useEffect(() => {
    GetBiometricsByUserId(currentUser.id).then((data) => setBiometrics(data));
  }, [user]);
  const heightOptions = [
    { feetInches: "4'0\"", inches: 48, centimeters: 121.92 },
    { feetInches: "4'1\"", inches: 49, centimeters: 124.46 },
    { feetInches: "4'2\"", inches: 50, centimeters: 127 },
    { feetInches: "4'3\"", inches: 51, centimeters: 129.54 },
    { feetInches: "4'4\"", inches: 52, centimeters: 132.08 },
    { feetInches: "4'5\"", inches: 53, centimeters: 134.62 },
    { feetInches: "4'6\"", inches: 54, centimeters: 137.16 },
    { feetInches: "4'7\"", inches: 55, centimeters: 139.7 },
    { feetInches: "4'8\"", inches: 56, centimeters: 142.24 },
    { feetInches: "4'9\"", inches: 57, centimeters: 144.78 },
    { feetInches: "4'10\"", inches: 58, centimeters: 147.32 },
    { feetInches: "4'11\"", inches: 59, centimeters: 149.86 },
    { feetInches: "5'0\"", inches: 60, centimeters: 152.4 },
    { feetInches: "5'1\"", inches: 61, centimeters: 154.94 },
    { feetInches: "5'2\"", inches: 62, centimeters: 157.48 },
    { feetInches: "5'3\"", inches: 63, centimeters: 160.02 },
    { feetInches: "5'4\"", inches: 64, centimeters: 162.56 },
    { feetInches: "5'5\"", inches: 65, centimeters: 165.1 },
    { feetInches: "5'6\"", inches: 66, centimeters: 167.64 },
    { feetInches: "5'7\"", inches: 67, centimeters: 170.18 },
    { feetInches: "5'8\"", inches: 68, centimeters: 172.72 },
    { feetInches: "5'9\"", inches: 69, centimeters: 175.26 },
    { feetInches: "5'10\"", inches: 70, centimeters: 177.8 },
    { feetInches: "5'11\"", inches: 71, centimeters: 180.34 },
    { feetInches: "6'0\"", inches: 72, centimeters: 182.88 },
    { feetInches: "6'1\"", inches: 73, centimeters: 185.42 },
    { feetInches: "6'2\"", inches: 74, centimeters: 187.96 },
    { feetInches: "6'3\"", inches: 75, centimeters: 190.5 },
    { feetInches: "6'4\"", inches: 76, centimeters: 193.04 },
    { feetInches: "6'5\"", inches: 77, centimeters: 195.58 },
    { feetInches: "6'6\"", inches: 78, centimeters: 198.12 },
    { feetInches: "6'7\"", inches: 79, centimeters: 200.66 },
    { feetInches: "6'8\"", inches: 80, centimeters: 203.2 },
    { feetInches: "6'9\"", inches: 81, centimeters: 205.74 },
    { feetInches: "6'10\"", inches: 82, centimeters: 208.28 },
    { feetInches: "6'11\"", inches: 83, centimeters: 210.82 },
    { feetInches: "7'0\"", inches: 84, centimeters: 213.36 },
  ];
  const weightOptions = [
    { pounds: 80, kilograms: 36.29 },
    { pounds: 81, kilograms: 36.74 },
    { pounds: 82, kilograms: 37.19 },
    { pounds: 83, kilograms: 37.64 },
    { pounds: 84, kilograms: 38.1 },
    { pounds: 85, kilograms: 38.55 },
    { pounds: 86, kilograms: 39.01 },
    { pounds: 87, kilograms: 39.46 },
    { pounds: 88, kilograms: 39.92 },
    { pounds: 89, kilograms: 40.37 },
    { pounds: 90, kilograms: 40.82 },
    { pounds: 91, kilograms: 41.28 },
    { pounds: 92, kilograms: 41.73 },
    { pounds: 93, kilograms: 42.18 },
    { pounds: 94, kilograms: 42.64 },
    { pounds: 95, kilograms: 43.09 },
    { pounds: 96, kilograms: 43.54 },
    { pounds: 97, kilograms: 44 },
    { pounds: 98, kilograms: 44.45 },
    { pounds: 99, kilograms: 44.91 },
    { pounds: 100, kilograms: 45.36 },
    { pounds: 101, kilograms: 45.81 },
    { pounds: 102, kilograms: 46.27 },
    { pounds: 103, kilograms: 46.72 },
    { pounds: 104, kilograms: 47.18 },
    { pounds: 105, kilograms: 47.63 },
    { pounds: 106, kilograms: 48.08 },
    { pounds: 107, kilograms: 48.54 },
    { pounds: 108, kilograms: 48.99 },
    { pounds: 109, kilograms: 49.44 },
    { pounds: 110, kilograms: 49.9 },
    { pounds: 111, kilograms: 50.35 },
    { pounds: 112, kilograms: 50.8 },
    { pounds: 113, kilograms: 51.26 },
    { pounds: 114, kilograms: 51.71 },
    { pounds: 115, kilograms: 52.16 },
    { pounds: 116, kilograms: 52.62 },
    { pounds: 117, kilograms: 53.07 },
    { pounds: 118, kilograms: 53.52 },
    { pounds: 119, kilograms: 53.98 },
    { pounds: 120, kilograms: 54.43 },
    { pounds: 121, kilograms: 54.88 },
    { pounds: 122, kilograms: 55.34 },
    { pounds: 123, kilograms: 55.79 },
    { pounds: 124, kilograms: 56.25 },
    { pounds: 125, kilograms: 56.7 },
    { pounds: 126, kilograms: 57.15 },
    { pounds: 127, kilograms: 57.61 },
    { pounds: 128, kilograms: 58.06 },
    { pounds: 129, kilograms: 58.51 },
    { pounds: 130, kilograms: 58.97 },
    { pounds: 131, kilograms: 59.42 },
    { pounds: 132, kilograms: 59.87 },
    { pounds: 133, kilograms: 60.33 },
    { pounds: 134, kilograms: 60.78 },
    { pounds: 135, kilograms: 61.23 },
    { pounds: 136, kilograms: 61.69 },
    { pounds: 137, kilograms: 62.14 },
    { pounds: 138, kilograms: 62.6 },
    { pounds: 139, kilograms: 63.05 },
    { pounds: 140, kilograms: 63.5 },
    { pounds: 141, kilograms: 63.95 },
    { pounds: 142, kilograms: 64.41 },
    { pounds: 143, kilograms: 64.86 },
    { pounds: 144, kilograms: 65.31 },
    { pounds: 145, kilograms: 65.77 },
    { pounds: 146, kilograms: 66.22 },
    { pounds: 147, kilograms: 66.68 },
    { pounds: 148, kilograms: 67.13 },
    { pounds: 149, kilograms: 67.58 },
    { pounds: 150, kilograms: 68.04 },
    { pounds: 151, kilograms: 68.49 },
    { pounds: 152, kilograms: 68.94 },
    { pounds: 153, kilograms: 69.4 },
    { pounds: 154, kilograms: 69.85 },
    { pounds: 155, kilograms: 70.31 },
    { pounds: 156, kilograms: 70.76 },
    { pounds: 157, kilograms: 71.21 },
    { pounds: 158, kilograms: 71.67 },
    { pounds: 159, kilograms: 72.12 },
    { pounds: 160, kilograms: 72.57 },
    { pounds: 161, kilograms: 73.03 },
    { pounds: 162, kilograms: 73.48 },
    { pounds: 163, kilograms: 73.93 },
    { pounds: 164, kilograms: 74.39 },
    { pounds: 165, kilograms: 74.84 },
    { pounds: 166, kilograms: 75.29 },
    { pounds: 167, kilograms: 75.75 },
    { pounds: 168, kilograms: 76.2 },
    { pounds: 169, kilograms: 76.66 },
    { pounds: 170, kilograms: 77.11 },
    { pounds: 171, kilograms: 77.56 },
    { pounds: 172, kilograms: 78.02 },
    { pounds: 173, kilograms: 78.47 },
    { pounds: 174, kilograms: 78.92 },
    { pounds: 175, kilograms: 79.38 },
    { pounds: 176, kilograms: 79.83 },
    { pounds: 177, kilograms: 80.28 },
    { pounds: 178, kilograms: 80.74 },
    { pounds: 179, kilograms: 81.19 },
    { pounds: 180, kilograms: 81.65 },
    { pounds: 181, kilograms: 82.1 },
    { pounds: 182, kilograms: 82.55 },
    { pounds: 183, kilograms: 83.01 },
    { pounds: 184, kilograms: 83.46 },
    { pounds: 185, kilograms: 83.91 },
    { pounds: 186, kilograms: 84.37 },
    { pounds: 187, kilograms: 84.82 },
    { pounds: 188, kilograms: 85.28 },
    { pounds: 189, kilograms: 85.73 },
    { pounds: 190, kilograms: 86.18 },
    { pounds: 191, kilograms: 86.64 },
    { pounds: 192, kilograms: 87.09 },
    { pounds: 193, kilograms: 87.54 },
    { pounds: 194, kilograms: 88 },
    { pounds: 195, kilograms: 88.45 },
    { pounds: 196, kilograms: 88.9 },
    { pounds: 197, kilograms: 89.36 },
    { pounds: 198, kilograms: 89.81 },
    { pounds: 199, kilograms: 90.27 },
    { pounds: 200, kilograms: 90.72 },
    { pounds: 201, kilograms: 91.17 },
    { pounds: 202, kilograms: 91.63 },
    { pounds: 203, kilograms: 92.08 },
    { pounds: 204, kilograms: 92.53 },
    { pounds: 205, kilograms: 92.99 },
    { pounds: 206, kilograms: 93.44 },
    { pounds: 207, kilograms: 93.89 },
    { pounds: 208, kilograms: 94.35 },
    { pounds: 209, kilograms: 94.8 },
    { pounds: 210, kilograms: 95.25 },
    { pounds: 211, kilograms: 95.71 },
    { pounds: 212, kilograms: 96.16 },
    { pounds: 213, kilograms: 96.62 },
    { pounds: 214, kilograms: 97.07 },
    { pounds: 215, kilograms: 97.52 },
    { pounds: 216, kilograms: 97.98 },
    { pounds: 217, kilograms: 98.43 },
    { pounds: 218, kilograms: 98.88 },
    { pounds: 219, kilograms: 99.34 },
    { pounds: 220, kilograms: 99.79 },
    { pounds: 221, kilograms: 100.24 },
    { pounds: 222, kilograms: 100.7 },
    { pounds: 223, kilograms: 101.15 },
    { pounds: 224, kilograms: 101.61 },
    { pounds: 225, kilograms: 102.06 },
    { pounds: 226, kilograms: 102.51 },
    { pounds: 227, kilograms: 102.97 },
    { pounds: 228, kilograms: 103.42 },
    { pounds: 229, kilograms: 103.87 },
    { pounds: 230, kilograms: 104.33 },
    { pounds: 231, kilograms: 104.78 },
    { pounds: 232, kilograms: 105.23 },
    { pounds: 233, kilograms: 105.69 },
    { pounds: 234, kilograms: 106.14 },
    { pounds: 235, kilograms: 106.59 },
    { pounds: 236, kilograms: 107.05 },
    { pounds: 237, kilograms: 107.5 },
    { pounds: 238, kilograms: 107.95 },
    { pounds: 239, kilograms: 108.41 },
    { pounds: 240, kilograms: 108.86 },
    { pounds: 241, kilograms: 109.32 },
    { pounds: 242, kilograms: 109.77 },
    { pounds: 243, kilograms: 110.22 },
    { pounds: 244, kilograms: 110.68 },
    { pounds: 245, kilograms: 111.13 },
    { pounds: 246, kilograms: 111.58 },
    { pounds: 247, kilograms: 112.04 },
    { pounds: 248, kilograms: 112.49 },
    { pounds: 249, kilograms: 112.94 },
    { pounds: 250, kilograms: 113.4 },
    { pounds: 251, kilograms: 113.85 },
    { pounds: 252, kilograms: 114.31 },
    { pounds: 253, kilograms: 114.76 },
    { pounds: 254, kilograms: 115.21 },
    { pounds: 255, kilograms: 115.67 },
    { pounds: 256, kilograms: 116.12 },
    { pounds: 257, kilograms: 116.57 },
    { pounds: 258, kilograms: 117.03 },
    { pounds: 259, kilograms: 117.48 },
    { pounds: 260, kilograms: 117.93 },
    { pounds: 261, kilograms: 118.39 },
    { pounds: 262, kilograms: 118.84 },
    { pounds: 263, kilograms: 119.3 },
    { pounds: 264, kilograms: 119.75 },
    { pounds: 265, kilograms: 120.2 },
    { pounds: 266, kilograms: 120.66 },
    { pounds: 267, kilograms: 121.11 },
    { pounds: 268, kilograms: 121.56 },
    { pounds: 269, kilograms: 122.02 },
    { pounds: 270, kilograms: 122.47 },
    { pounds: 271, kilograms: 122.92 },
    { pounds: 272, kilograms: 123.38 },
    { pounds: 273, kilograms: 123.83 },
    { pounds: 274, kilograms: 124.28 },
    { pounds: 275, kilograms: 124.74 },
    { pounds: 276, kilograms: 125.19 },
    { pounds: 277, kilograms: 125.64 },
    { pounds: 278, kilograms: 126.1 },
    { pounds: 279, kilograms: 126.55 },
    { pounds: 280, kilograms: 127 },
    { pounds: 281, kilograms: 127.46 },
    { pounds: 282, kilograms: 127.91 },
    { pounds: 283, kilograms: 128.37 },
    { pounds: 284, kilograms: 128.82 },
    { pounds: 285, kilograms: 129.27 },
    { pounds: 286, kilograms: 129.73 },
    { pounds: 287, kilograms: 130.18 },
    { pounds: 288, kilograms: 130.63 },
    { pounds: 289, kilograms: 131.09 },
    { pounds: 290, kilograms: 131.54 },
    { pounds: 291, kilograms: 131.99 },
    { pounds: 292, kilograms: 132.45 },
    { pounds: 293, kilograms: 132.9 },
    { pounds: 294, kilograms: 133.35 },
    { pounds: 295, kilograms: 133.81 },
    { pounds: 296, kilograms: 134.26 },
    { pounds: 297, kilograms: 134.71 },
    { pounds: 298, kilograms: 135.17 },
    { pounds: 299, kilograms: 135.62 },
    { pounds: 300, kilograms: 136.08 },
    { pounds: 301, kilograms: 136.53 },
    { pounds: 302, kilograms: 136.98 },
    { pounds: 303, kilograms: 137.44 },
    { pounds: 304, kilograms: 137.89 },
    { pounds: 305, kilograms: 138.34 },
    { pounds: 306, kilograms: 138.8 },
    { pounds: 307, kilograms: 139.25 },
    { pounds: 308, kilograms: 139.7 },
    { pounds: 309, kilograms: 140.16 },
    { pounds: 310, kilograms: 140.61 },
    { pounds: 311, kilograms: 141.06 },
    { pounds: 312, kilograms: 141.52 },
    { pounds: 313, kilograms: 141.97 },
    { pounds: 314, kilograms: 142.43 },
    { pounds: 315, kilograms: 142.88 },
    { pounds: 316, kilograms: 143.33 },
    { pounds: 317, kilograms: 143.79 },
    { pounds: 318, kilograms: 144.24 },
    { pounds: 319, kilograms: 144.69 },
    { pounds: 320, kilograms: 145.15 },
    { pounds: 321, kilograms: 145.6 },
    { pounds: 322, kilograms: 146.05 },
    { pounds: 323, kilograms: 146.51 },
    { pounds: 324, kilograms: 146.96 },
    { pounds: 325, kilograms: 147.42 },
    { pounds: 326, kilograms: 147.87 },
    { pounds: 327, kilograms: 148.32 },
    { pounds: 328, kilograms: 148.78 },
    { pounds: 329, kilograms: 149.23 },
    { pounds: 330, kilograms: 149.68 },
    { pounds: 331, kilograms: 150.14 },
    { pounds: 332, kilograms: 150.59 },
    { pounds: 333, kilograms: 151.04 },
    { pounds: 334, kilograms: 151.5 },
    { pounds: 335, kilograms: 151.95 },
    { pounds: 336, kilograms: 152.41 },
    { pounds: 337, kilograms: 152.86 },
    { pounds: 338, kilograms: 153.31 },
    { pounds: 339, kilograms: 153.77 },
    { pounds: 340, kilograms: 154.22 },
    { pounds: 341, kilograms: 154.67 },
    { pounds: 342, kilograms: 155.13 },
    { pounds: 343, kilograms: 155.58 },
    { pounds: 344, kilograms: 156.03 },
    { pounds: 345, kilograms: 156.49 },
    { pounds: 346, kilograms: 156.94 },
    { pounds: 347, kilograms: 157.39 },
    { pounds: 348, kilograms: 157.85 },
    { pounds: 349, kilograms: 158.3 },
    { pounds: 350, kilograms: 158.76 },
  ];

  const handleSave = (event) => {
    event.preventDefault();
    const newBiometrics = {
      id: biometrics.id,
      userId: biometrics.userId,
      age: parseInt(biometrics.age),
      weight: parseInt(biometrics.weight),
      height: parseInt(biometrics.height),
    };
    updateBiometrics(newBiometrics).then(navigate("/userprofile"));
  };
  return (
    <form className="coreComponent" onSubmit={handleSave}>
      <div className="backButton">
        <ArrowLeft
          size={30}
          id="backTarget"
          onClick={(event) => {
            navigate(`/userprofile`);
          }}
        />
        <Tooltip
            isOpen={toolTipOpen1}
            target="backTarget" // Tooltip target matches the Play icon id
            toggle={toggle1}
            placement="top" // You can adjust placement as needed
          >
            Back
          </Tooltip>
      </div>
      <Label>Age:</Label>
      <Input
        defaultValue={biometrics.age}
        type="number"
        onChange={(event) => {
          const biometricsCopy = { ...biometrics };
          biometricsCopy.age = event.target.value;
          setBiometrics(biometricsCopy);
        }}
      ></Input>

<Label>Height:</Label>
      <Input
        type="select"
        onChange={(event) => {
          const biometricsCopy = { ...biometrics };
          biometricsCopy.height = event.target.value;
          setBiometrics(biometricsCopy);
        }}
      >
        <option>Customary / Metric</option>
        {heightOptions.map((h) => {
          return (
            <option value={h.centimeters}>
              {h.feetInches} / {h.centimeters} cm
            </option>
          );
        })}
      </Input>
      <Label>Weight:</Label>
      <Input
        required
        type="select"
        onChange={(event) => {
          const biometricsCopy = { ...biometrics };
          biometricsCopy.weight = event.target.value;
          setBiometrics(biometricsCopy);
        }}
      >
        <option>Customary / Metric</option>
        {weightOptions.map((w) => {
          return (
            <option value={w.kilograms}>
              {w.pounds}lbs / {w.kilograms}kgs
            </option>
          );
        })}
      </Input>
      <button className="exerciseButton" type="submit">
        Save
      </button>
    </form>
  );
};
