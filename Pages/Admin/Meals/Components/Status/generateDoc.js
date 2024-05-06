import { jsPDF } from "jspdf";

PT_TO_MM = 0.3527777778;

export default function generateDoc() {
  console.log("generating docs");

  // Default export is a4 paper, portrait, using millimeters for units
  const doc = new DocBuilder();

  doc.addTitle("Late Suppers");

  doc.addDescription(
    "Please corss off your name once you have had your late supper. If your name is not on the list, please do NOT take a late supper."
  );

  doc.addMealCategoryTitle("Late Suppers");

  for (let i = 0; i < 30; i++) {
    doc.addUser("User " + i);
  }

  doc.addMealCategoryTitle("Late Suppers");
  doc.addUser("User 1");

  doc.addTitle("Late meals");

  doc.addMealCategoryTitle("Late Suppers");
  doc.addUser("User 1");

  doc.save("test.pdf");
}

class DocBuilder {
  constructor() {
    this.doc = new jsPDF({ format: "letter" });

    this.pageHeight =
      this.doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    this.pageWidth =
      this.doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

    this.current_vertical_position = 0;
    this.titleIndex = 0;

    this.TitleFontSize = 20;
    this.SubtitleFontSize = 15;
    this.NormalFontSize = 12;
    this.subtitleTopMargin = 2;
    this.pageMargin = 5;
    this.topPageMargin = 10;
  }

  addDescription(description) {
    this.current_vertical_position += this.subtitleTopMargin;
    this.doc.setFontSize(this.NormalFontSize);
    this.doc.setFont("helvetica", "normal");
    var splitTitle = this.doc.splitTextToSize(
      description,
      this.pageWidth - 2 * this.pageMargin
    );
    this.doc.text(splitTitle, this.pageMargin, this.current_vertical_position);
    console.log("after description: ", this.NormalFontSize * splitTitle.length);
    this.current_vertical_position +=
      this.NormalFontSize * splitTitle.length * PT_TO_MM +
      this.subtitleTopMargin;

    this.topAllPageLimit = this.current_vertical_position;
  }

  addTitle(title) {
    // Position text at the center

    if (this.titleIndex == 0) {
      this.current_vertical_position += this.topPageMargin;
    } else if (this.titleIndex == 1) {
      this.current_vertical_position = this.pageHeight / 2 + this.topPageMargin;
    } else {
      alert("Multiple pages not yet supported");
    }

    this.doc.setFontSize(this.TitleFontSize);
    this.doc.setFont("helvetica", "bold");
    this.doc.text(title, this.pageWidth / 2, this.current_vertical_position, {
      align: "center",
    });

    this.current_vertical_position += 1;
    // Add underline
    const textWidth = this.doc.getTextWidth(title);
    this.doc.setLineWidth(0.5);
    this.doc.line(
      this.pageWidth / 2 - textWidth / 2,
      this.current_vertical_position,
      this.pageWidth / 2 + textWidth / 2,
      this.current_vertical_position
    );

    this.current_vertical_position += this.TitleFontSize * PT_TO_MM;

    this.contentColumn = 0;

    this.topAllPageLimit = this.current_vertical_position;

    this.titleIndex += 1;
  }

  addMealCategoryTitle(category) {
    // this.current_vertical_position += this.subtitleTopMargin;
    this.doc.setFontSize(this.SubtitleFontSize);
    this.doc.setFont("helvetica", "bold");

    const horizontalPostion =
      this.contentColumn == 1 ? this.pageWidth / 2 : this.pageMargin;

    this.doc.text(category, horizontalPostion, this.current_vertical_position, {
      align: "left",
    });

    this.current_vertical_position += this.SubtitleFontSize * PT_TO_MM;

    this.updateContentColumn();
  }

  addUser(userString) {
    this.doc.setFontSize(this.NormalFontSize);
    this.doc.setFont("helvetica", "normal");

    const horizontalPostion =
      this.contentColumn == 1 ? this.pageWidth / 2 : this.pageMargin;

    this.doc.text(
      userString,
      horizontalPostion,
      this.current_vertical_position
    );

    this.current_vertical_position += this.NormalFontSize * PT_TO_MM;

    this.updateContentColumn();
  }

  updateContentColumn() {
    if (
      this.current_vertical_position >
      this.pageHeight / 2 - 2 * this.topPageMargin
    ) {
      this.current_vertical_position = this.topAllPageLimit;

      if (this.contentColumn === 0) {
        this.contentColumn = 1;
        this.current_vertical_position = this.topAllPageLimit;
      } else {
        alert("Document is too long");
      }
    }
  }

  save(fileName) {
    this.doc.save(fileName);
  }
}
