from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.pdfgen import canvas
from io import BytesIO
from typing import Dict, Any, List

class PDFService:
    def __init__(self):
        self.styles = getSampleStyleSheet()
        self._setup_custom_styles()
    
    def _setup_custom_styles(self):
        """Setup custom styles for PDF"""
        # Title style
        self.styles.add(ParagraphStyle(
            name='CustomTitle',
            parent=self.styles['Heading1'],
            fontSize=24,
            textColor='#1a1a1a',
            spaceAfter=30,
            alignment=TA_CENTER
        ))
        
        # Section title style
        self.styles.add(ParagraphStyle(
            name='SectionTitle',
            parent=self.styles['Heading2'],
            fontSize=18,
            textColor='#2c3e50',
            spaceAfter=12,
            spaceBefore=20
        ))
        
        # Topic style
        self.styles.add(ParagraphStyle(
            name='TopicStyle',
            parent=self.styles['BodyText'],
            fontSize=12,
            textColor='#34495e',
            leftIndent=20,
            spaceAfter=8
        ))
        
        # Tree node style
        self.styles.add(ParagraphStyle(
            name='TreeNode',
            parent=self.styles['BodyText'],
            fontSize=11,
            textColor='#34495e',
            spaceAfter=4
        ))
        
        # Summary style
        self.styles.add(ParagraphStyle(
            name='SummaryStyle',
            parent=self.styles['BodyText'],
            fontSize=12,
            textColor='#555555',
            spaceAfter=12,
            leading=16
        ))
    
    def generate_pdf(self, analysis_data: Dict[str, Any], filename: str = None) -> BytesIO:
        """
        Generate PDF from analysis data.
        
        Args:
            analysis_data: Dictionary containing summary, keyTopics, and topicTree
            filename: Optional filename for the PDF
            
        Returns:
            BytesIO object containing the PDF
        """
        buffer = BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=letter, 
                                rightMargin=72, leftMargin=72,
                                topMargin=72, bottomMargin=72)
        
        story = []
        
        # Title
        title = Paragraph("Learning Map Analysis", self.styles['CustomTitle'])
        story.append(title)
        story.append(Spacer(1, 0.3*inch))
        
        # Summary Section
        summary_title = Paragraph("Summary", self.styles['SectionTitle'])
        story.append(summary_title)
        
        summary_text = analysis_data.get('summary', 'No summary available.')
        summary_para = Paragraph(summary_text, self.styles['SummaryStyle'])
        story.append(summary_para)
        story.append(Spacer(1, 0.2*inch))
        
        # Key Topics Section
        key_topics = analysis_data.get('keyTopics', [])
        if key_topics:
            topics_title = Paragraph("Key Topics", self.styles['SectionTitle'])
            story.append(topics_title)
            
            for topic in key_topics:
                topic_para = Paragraph(f"• {topic}", self.styles['TopicStyle'])
                story.append(topic_para)
            
            story.append(Spacer(1, 0.2*inch))
        
        # Topic Tree Section
        topic_tree = analysis_data.get('topicTree', [])
        if topic_tree:
            tree_title = Paragraph("Topic Tree", self.styles['SectionTitle'])
            story.append(tree_title)
            
            for node in topic_tree:
                self._add_tree_node(story, node, 0)
            
            story.append(Spacer(1, 0.2*inch))
        
        # Build PDF
        doc.build(story)
        buffer.seek(0)
        
        return buffer
    
    def _add_tree_node(self, story: List, node: Dict[str, Any], level: int):
        """
        Recursively add tree nodes to PDF story.
        
        Args:
            story: List to append story elements to
            node: Node dictionary with id, label, and optional children
            level: Current nesting level (for indentation)
        """
        indent = level * 20
        label = node.get('label', '')
        
        # Create indentation style based on level
        if level == 0:
            # Root level - use Heading3 style
            node_style = ParagraphStyle(
                name=f'TreeNodeLevel{level}',
                parent=self.styles['Heading3'],
                fontSize=14,
                textColor='#2c3e50',
                leftIndent=indent,
                spaceAfter=6,
                spaceBefore=10 if level == 0 else 4
            )
        elif level == 1:
            # Second level
            node_style = ParagraphStyle(
                name=f'TreeNodeLevel{level}',
                parent=self.styles['BodyText'],
                fontSize=12,
                textColor='#34495e',
                leftIndent=indent + 10,
                spaceAfter=4,
                spaceBefore=6
            )
        else:
            # Deeper levels
            node_style = ParagraphStyle(
                name=f'TreeNodeLevel{level}',
                parent=self.styles['BodyText'],
                fontSize=11,
                textColor='#555555',
                leftIndent=indent + 20,
                spaceAfter=3,
                spaceBefore=3
            )
        
        # Add bullet or numbering based on level
        prefix = "• " if level > 0 else ""
        node_para = Paragraph(f"{prefix}{label}", node_style)
        story.append(node_para)
        
        # Recursively add children
        children = node.get('children', [])
        for child in children:
            self._add_tree_node(story, child, level + 1)
