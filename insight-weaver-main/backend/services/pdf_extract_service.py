import PyPDF2
from io import BytesIO
from typing import Optional

class PDFExtractService:
    """Service for extracting text content from PDF files"""
    
    def extract_text(self, pdf_file) -> str:
        """
        Extract text content from PDF file.
        
        Args:
            pdf_file: File object from Flask request
            
        Returns:
            Extracted text content as string
        """
        try:
            # Read PDF file
            pdf_reader = PyPDF2.PdfReader(pdf_file)
            
            # Extract text from all pages
            text_content = ""
            for page_num, page in enumerate(pdf_reader.pages):
                try:
                    page_text = page.extract_text()
                    if page_text:
                        text_content += page_text + "\n\n"
                except Exception as e:
                    print(f"Warning: Could not extract text from page {page_num + 1}: {e}")
                    continue
            
            if not text_content.strip():
                raise Exception("No text content found in PDF. The PDF might contain only images.")
            
            return text_content.strip()
            
        except PyPDF2.errors.PdfReadError as e:
            raise Exception(f"Invalid or corrupted PDF file: {str(e)}")
        except Exception as e:
            raise Exception(f"Failed to extract text from PDF: {str(e)}")
