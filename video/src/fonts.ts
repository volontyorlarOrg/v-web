import { loadFont as loadOnest } from "@remotion/google-fonts/Onest";
import { loadFont as loadSourceSerif } from "@remotion/google-fonts/SourceSerif4";

loadOnest("normal", { weights: ["400", "500", "600", "700"], subsets: ["latin", "latin-ext"] });
loadSourceSerif("normal", { weights: ["400"], subsets: ["latin", "latin-ext"] });
