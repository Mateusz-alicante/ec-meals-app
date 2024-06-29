import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Platform,
    Button,
} from "react-native";

import * as fs from "fs";
import { Document, Paragraph, TextRun, Packer, convertInchesToTwip, AlignmentType, BorderStyle, Table, TableRow, TableCell, WidthType } from 'docx';

import { useEffect } from "react";
import Icons from "@expo/vector-icons/Ionicons";

export default function MealReportGenerator({ data, date }) {
const generateReport = () => {
    console.log("Generating report");
    createDoc(data.meals, date);
    }

useEffect(() => {
    console.log("Data: ", data);
    console.log("Date: ", date);
}
, [data, date]);

return (
    <TouchableOpacity onPress={generateReport} style={styles.ButtonContainer}>
    <Text style={styles.statusText}>Generate report</Text>
    <Icons
        name={"document-text-outline"}
        size={30}
        color={"#3b78a1"}
    />
    </TouchableOpacity>
);
}

  const styles = StyleSheet.create({
    statusText: {
      fontSize: 20,
      fontWeight: "bold",
    },
    ButtonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        margin: 10,
        borderRadius: 10,
    }
  });
  


const colWidth = 5000;
const textFont = "Arial";


function createDoc(obj, date) {
    // Get the packedMeals array
    const packedMeals = obj['packedMeals'];

    // Initialize an array to hold the rows
    
    const mealTypes = ["P 1", "P 2", "P S"];
    let top_row = [
        new TableRow({
            
            children: mealTypes.map(mealType => new TableCell({
                width: { size: colWidth, type: WidthType.DXA },
                alignItems: AlignmentType.CENTER,
                margins: {
                    top: 100,
                    bottom: 100,
                },
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: mealType,
                                font: textFont,
                                size: 30,
                                underline: true,
                                bold: true,
                                alignment: AlignmentType.CENTER,
                            })],
                            alignment: AlignmentType.CENTER,
                    })
                ],
            }),
        ),
        }),
    ];
    // Find the maximum length among the sub-arrays
    const maxLength = Math.max(...packedMeals.map(mealUsers => mealUsers.length));

    // Iterate over each index
    for (let i = 0; i < maxLength; i++) {
        // Initialize an array to hold the cells for this row
        let cells = [];

        // Iterate over each meal type
        for (let j = 0; j < packedMeals.length; j++) {
            // Get the user for this meal type and index
            const user = packedMeals[j][i];

            // Create a new TableCell for the user
            const cell = new TableCell({
                children: [new Paragraph(
                    {
                        children: [
                            new TextRun({
                                text: user ? user.name : '',
                                font: textFont,
                                bold: true,
                                size: 25,
                            }),
                        ],
                        alignment: AlignmentType.CENTER,
                    }
                )],
                bold: true,
                margins: {
                    top: 100,
                    bottom: 100,
                },
            });

            // Add the cell to the cells array
            cells.push(cell);
        }

        // Create a new TableRow with the cells and add it to the rows array
        top_row.push(new TableRow({ children: cells }));
    }

    const doc = new Document(
        {
            sections: [
                {
                    properties: {},
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: "Packed Meals",
                                    bold: true,
                                    underline: true,
                                    font: textFont,
                                    size: 48,
                                }),
                            ],
                            alignment: "center",
                        }),
                        new Paragraph(""),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: "Please cross off your name when you take your packed meal.",
                                    bold: true,
                                    font: textFont,
                                })
                            ],
                            alignment: "center",
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: "Please do NOT take a pack meal if your name is not on the list.",
                                    bold: true,
                                    font: textFont,
                                })
                            ],
                            alignment: "center",
                        }),
                        new Paragraph(""),
                        new Table({
                            alignment: AlignmentType.CENTER,
                            columnWidths: [colWidth, colWidth, colWidth],
                            rows: top_row,
                            borders: {
                                top: BorderStyle.NONE,
                                right: BorderStyle.NONE,
                                bottom: BorderStyle.NONE,
                                left: BorderStyle.NONE,
                                insideHorizontal: BorderStyle.NONE,
                                insideVertical: BorderStyle.NONE,
                            },
                        }),

                        // Add a lot of space here
                        new Paragraph({
                            text: "",
                            spacing: {
                                after: 1000, // space after the paragraph
                            },
                        }),

                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: "Late Suppers",
                                    bold: true,
                                    underline: true,
                                    font: textFont,
                                    size: 48,
                                }),
                            ],
                            alignment: "center",
                        }),
                        new Paragraph(""),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: "Please cross off your name when you take your late supper.",
                                    bold: true,
                                    font: textFont,
                                })
                            ],
                            alignment: "center",
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: "Please do NOT take a late supper if your name is not on the list.",
                                    bold: true,
                                    font: textFont,
                                })
                            ],
                            alignment: "center",
                        }),
                    ],
                },
            ],
        },
    );

    Packer.toBlob(doc).then((blob) => {
        console.log(blob);
        saveFile(blob, `${getDateString(date)}.docx`);
        console.log("Document created successfully");
    });
}


const saveFile = async (blob, filename) => {
    const a = document.createElement('a');
    a.download = filename;
    a.href = URL.createObjectURL(blob);
    a.addEventListener('click', (e) => {
      setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
    });
    a.click();
  };

const getDateString = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekDay = date.getDay();

    return `${days[weekDay]} ${day} (${day}/${month}/${year})`;
}