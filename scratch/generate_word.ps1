# Create Word document containing 2all.ai workflow details
# Failsafe script: Uses MS Word COM automation if available, falls back to generating a Word-optimized document structure.

$docxPath = "d:\2all-ai website\2all-ai website\workflow.docx"
$fallbackPath = "d:\2all-ai website\2all-ai website\workflow.doc"

$Title = "2all.ai Accessibility Platform Workflow"

$Intro = "2all.ai is a Software-as-a-Service (SaaS) accessibility platform designed to help website owners improve the accessibility of their websites through an AI-powered accessibility widget, accessibility scanning, domain management, and centralized administration. The platform allows organizations to register websites, verify ownership, generate secure API keys, deploy the widget, and monitor accessibility compliance from a single dashboard."

$WorkflowSteps = @(
    "Customer",
    "  |",
    "  v",
    "Register / Login",
    "  |",
    "  v",
    "Dashboard",
    "  |",
    "  v",
    "Add Domain",
    "  |",
    "  v",
    "Verify Domain Ownership (Meta Tag / DNS TXT / HTML File)",
    "  |",
    "  v",
    "Domain Activated",
    "  |",
    "  v",
    "Generate API Key",
    "  |",
    "  v",
    "Assign API Key to Domain",
    "  |",
    "  v",
    "Generate Installation Script",
    "  |",
    "  v",
    "Install loader.js on Website",
    "  |",
    "  v",
    "Bootstrap Validation (API Key + Domain)",
    "  |",
    "  v",
    "Load widget-core.js",
    "  |",
    "  v",
    "Accessibility Widget Appears",
    "  |",
    "  v",
    "Visitor Selects Accessibility Profile or Manual Settings",
    "  |",
    "  v",
    "AI Accessibility Engine",
    "    +-- DOM Analysis",
    "    +-- WCAG Rule Validation",
    "    +-- ARIA Enhancement",
    "    +-- Image Alt Detection",
    "    +-- Keyboard Navigation",
    "    +-- Focus Management",
    "    +-- Runtime Accessibility Adjustments",
    "  |",
    "  v",
    "Accessible Website Experience",
    "  |",
    "  v",
    "Run Accessibility Audit",
    "  |",
    "  v",
    "Generate Compliance Score & Reports",
    "  |",
    "  v",
    "Platform Management (Billing, Reports, Settings, Audit Logs)"
)

$Explanation = @(
    "Users register and access the customer dashboard.",
    "A website domain is added and ownership is verified using a Meta Tag, DNS TXT record, or HTML verification file.",
    "After successful verification, the domain becomes active.",
    "The customer generates an API key and links it to the verified domain.",
    "The platform generates an installation snippet that loads loader.js on the customer's website.",
    "The loader validates the API key and domain, retrieves widget settings, and loads widget-core.js.",
    "Visitors use the accessibility widget to apply accessibility profiles or manual adjustments such as contrast, font size, dyslexia mode, text-to-speech, keyboard navigation, and color filters.",
    "The AI accessibility engine performs runtime enhancements including DOM analysis, ARIA improvements, WCAG validation, image accessibility support, and keyboard optimization.",
    "Administrators can run accessibility audits, view compliance reports, manage billing, monitor usage, and configure platform settings."
)

$Conclusion = "The 2all.ai workflow combines SaaS management with real-time accessibility services. Unlike a simple accessibility widget, the platform provides domain verification, API key management, AI-powered runtime accessibility improvements, compliance auditing, reporting, and centralized administration. This architecture enables organizations to deploy, manage, and continuously improve website accessibility in a scalable and secure manner."

try {
    Write-Host "Attempting Word COM automation..."
    $word = New-Object -ComObject Word.Application -ErrorAction Stop
    $word.Visible = $false
    $doc = $word.Documents.Add()
    
    # Page setup
    $doc.PageSetup.TopMargin = 72 # 1 inch
    $doc.PageSetup.BottomMargin = 72
    $doc.PageSetup.LeftMargin = 72
    $doc.PageSetup.RightMargin = 72

    # Title
    $para = $doc.Paragraphs.Add()
    $para.Range.Text = $Title
    $para.Range.Font.Name = "Arial"
    $para.Range.Font.Size = 22
    $para.Range.Font.Bold = $true
    $para.Range.Font.Color = 0x004BFF # Blue color
    $para.Format.SpaceAfter = 18
    $para.Range.InsertParagraphAfter()

    # Introduction Heading
    $para = $doc.Paragraphs.Add()
    $para.Range.Text = "Introduction"
    $para.Range.Font.Name = "Arial"
    $para.Range.Font.Size = 14
    $para.Range.Font.Bold = $true
    $para.Range.Font.Color = 0x1E293B
    $para.Format.SpaceAfter = 6
    $para.Range.InsertParagraphAfter()

    # Introduction Content
    $para = $doc.Paragraphs.Add()
    $para.Range.Text = $Intro
    $para.Range.Font.Name = "Arial"
    $para.Range.Font.Size = 11
    $para.Range.Font.Bold = $false
    $para.Range.Font.Color = 0x334155
    $para.Format.SpaceAfter = 18
    $para.Range.InsertParagraphAfter()

    # Complete Workflow Heading
    $para = $doc.Paragraphs.Add()
    $para.Range.Text = "Complete Workflow"
    $para.Range.Font.Name = "Arial"
    $para.Range.Font.Size = 14
    $para.Range.Font.Bold = $true
    $para.Range.Font.Color = 0x1E293B
    $para.Format.SpaceAfter = 6
    $para.Range.InsertParagraphAfter()

    # Workflow list
    foreach ($step in $WorkflowSteps) {
        $para = $doc.Paragraphs.Add()
        $para.Range.Text = $step
        if ($step -match "\+--") {
            $para.Range.Font.Name = "Courier New"
            $para.Range.Font.Size = 10
            $para.Range.Font.Bold = $false
            $para.Range.Font.Color = 0x7C3AED
        } elseif ($step -match "\|" -or $step -match " v$") {
            $para.Range.Font.Name = "Courier New"
            $para.Range.Font.Size = 11
            $para.Range.Font.Bold = $true
            $para.Range.Font.Color = 0x94A3B8
        } else {
            $para.Range.Font.Name = "Arial"
            $para.Range.Font.Size = 11
            $para.Range.Font.Bold = $true
            $para.Range.Font.Color = 0x004BFF
        }
        $para.Format.SpaceAfter = 2
        $para.Range.InsertParagraphAfter()
    }

    # Add space after workflow diagram
    $para = $doc.Paragraphs.Add()
    $para.Format.SpaceAfter = 18
    $para.Range.InsertParagraphAfter()

    # Explanation Heading
    $para = $doc.Paragraphs.Add()
    $para.Range.Text = "Workflow Explanation"
    $para.Range.Font.Name = "Arial"
    $para.Range.Font.Size = 14
    $para.Range.Font.Bold = $true
    $para.Range.Font.Color = 0x1E293B
    $para.Format.SpaceAfter = 6
    $para.Range.InsertParagraphAfter()

    # Explanation numbered list
    $idx = 1
    foreach ($item in $Explanation) {
        $para = $doc.Paragraphs.Add()
        $para.Range.Text = "$idx. $item"
        $para.Range.Font.Name = "Arial"
        $para.Range.Font.Size = 11
        $para.Range.Font.Bold = $false
        $para.Range.Font.Color = 0x334155
        $para.Format.SpaceAfter = 6
        $para.Range.InsertParagraphAfter()
        $idx++
    }

    # Conclusion Heading
    $para = $doc.Paragraphs.Add()
    $para.Range.Text = "Conclusion"
    $para.Range.Font.Name = "Arial"
    $para.Range.Font.Size = 14
    $para.Range.Font.Bold = $true
    $para.Range.Font.Color = 0x1E293B
    $para.Format.SpaceAfter = 6
    $para.Range.InsertParagraphAfter()

    # Conclusion Content
    $para = $doc.Paragraphs.Add()
    $para.Range.Text = $Conclusion
    $para.Range.Font.Name = "Arial"
    $para.Range.Font.Size = 11
    $para.Range.Font.Bold = $false
    $para.Range.Font.Color = 0x334155
    $para.Format.SpaceAfter = 18
    $para.Range.InsertParagraphAfter()

    # Save as native DOCX (format code 16 = wdFormatXMLDocument)
    $doc.SaveAs([ref]$docxPath, [ref]16)
    $doc.Close()
    $word.Quit()
    Write-Host "Successfully generated native workflow.docx!"
} catch {
    Write-Host "Word COM not available or error occurred. Creating styled workflow.doc (Word-compatible HTML)..."
    
    # Generate HTML formatted especially for Word compatibility
    $htmlContent = @"
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>$Title</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      color: #333333;
      line-height: 1.5;
      padding: 20px;
    }
    h1 {
      color: #004bff;
      font-size: 24pt;
      margin-bottom: 12pt;
    }
    h2 {
      color: #1e293b;
      font-size: 16pt;
      margin-top: 18pt;
      margin-bottom: 6pt;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 4pt;
    }
    p {
      font-size: 11pt;
      margin-bottom: 12pt;
    }
    .flow-step {
      font-family: Arial, sans-serif;
      font-size: 11pt;
      font-weight: bold;
      color: #004bff;
      margin: 2pt 0;
    }
    .flow-arrow {
      font-family: Courier New, monospace;
      font-size: 11pt;
      font-weight: bold;
      color: #94a3b8;
      margin: 2pt 0;
    }
    .flow-substep {
      font-family: Courier New, monospace;
      font-size: 10pt;
      color: #7c3aed;
      margin: 2pt 0;
      padding-left: 20px;
    }
    ol {
      margin-bottom: 12pt;
      padding-left: 20px;
    }
    li {
      font-size: 11pt;
      margin-bottom: 6pt;
    }
  </style>
</head>
<body>
  <h1>$Title</h1>
  
  <h2>Introduction</h2>
  <p>$Intro</p>
  
  <h2>Complete Workflow</h2>
"@

    foreach ($step in $WorkflowSteps) {
        if ($step -match "\+--") {
            $htmlContent += "  <div class='flow-substep'>$step</div>`n"
        } elseif ($step -match "\|" -or $step -match " v$") {
            $htmlContent += "  <div class='flow-arrow'>$step</div>`n"
        } else {
            $htmlContent += "  <div class='flow-step'>$step</div>`n"
        }
    }

    $htmlContent += @"
  
  <h2>Workflow Explanation</h2>
  <ol>
"@

    foreach ($item in $Explanation) {
        $htmlContent += "    <li>$item</li>`n"
    }

    $htmlContent += @"
  </ol>
  
  <h2>Conclusion</h2>
  <p>$Conclusion</p>
</body>
</html>
"@

    [System.IO.File]::WriteAllText($fallbackPath, $htmlContent)
    Write-Host "Successfully generated fallback workflow.doc!"
}
